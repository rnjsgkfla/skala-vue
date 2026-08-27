import axios from 'axios'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const openWeatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
})

const airQualityClient = axios.create({
  baseURL: 'https://air-quality-api.open-meteo.com/v1',
  timeout: 10000,
})

export const WEATHER_CITIES = [
  { id: '01', name: '서울', query: 'Seoul,KR' },
  { id: '02', name: '수원', query: 'Suwon,KR' },
  { id: '03', name: '부산', query: 'Busan,KR' },
  { id: '04', name: '제주', query: 'Jeju City,KR' },
]

const requireApiKey = () => {
  if (!OPENWEATHER_API_KEY) {
    throw new Error('OpenWeather API 키가 없습니다. .env.local에 VITE_OPENWEATHER_API_KEY를 설정해 주세요.')
  }
}

const findCity = (cityId) => {
  const city = WEATHER_CITIES.find((item) => item.id === cityId)

  if (!city) {
    throw new Error('지원하지 않는 도시입니다.')
  }

  return city
}

const openWeatherParams = (query) => ({
  q: query,
  appid: OPENWEATHER_API_KEY,
  units: 'metric',
  lang: 'kr',
})

// OpenWeather의 직역 표현을 화면에서 이해하기 쉬운 한국어로 바꿉니다.
const WEATHER_DESCRIPTION_LABELS = {
  온흐림: '흐림',
  튼구름: '구름 많음',
  구름조금: '구름 조금',
  '약간의 구름이 낀 하늘': '구름 조금',
  '실 비': '약한 비',
}

const formatWeatherDescription = (description) => {
  if (!description) return '정보 없음'

  return WEATHER_DESCRIPTION_LABELS[description] ?? description
}

const mapCurrentWeather = (city, data) => ({
  id: city.id,
  name: city.name,
  temp: Math.round(data.main.temp),
  status: formatWeatherDescription(data.weather[0]?.description),
  humidity: data.main.humidity,
  windSpeed: data.wind.speed,
  latitude: data.coord.lat,
  longitude: data.coord.lon,
})

// OpenWeather Current Weather API로 한 도시의 현재 날씨를 조회합니다.
export const fetchCurrentWeather = async (city) => {
  requireApiKey()

  const { data } = await openWeatherClient.get('/weather', {
    params: openWeatherParams(city.query),
  })

  return mapCurrentWeather(city, data)
}

// 여러 도시 요청을 병렬 처리해 대시보드 대기 시간을 줄입니다.
export const fetchWeatherDashboard = async () => {
  return Promise.all(WEATHER_CITIES.map((city) => fetchCurrentWeather(city)))
}

// OpenWeather 5 day / 3 hour Forecast에서 날짜별 정오와 가장 가까운 값 하나를 선택합니다.
export const fetchFiveDayForecast = async (cityId) => {
  requireApiKey()
  const city = findCity(cityId)
  const { data } = await openWeatherClient.get('/forecast', {
    params: openWeatherParams(city.query),
  })

  const dailyForecast = new Map()

  data.list.forEach((item) => {
    const [date, time] = item.dt_txt.split(' ')
    const hour = Number(time.slice(0, 2))
    const distanceFromNoon = Math.abs(hour - 12)
    const previous = dailyForecast.get(date)

    if (!previous || distanceFromNoon < previous.distanceFromNoon) {
      dailyForecast.set(date, {
        date,
        distanceFromNoon,
        temp: Math.round(item.main.temp),
        status: formatWeatherDescription(item.weather[0]?.description),
      })
    }
  })

  return [...dailyForecast.values()].slice(0, 5)
}

// 별도 외부 API인 Open-Meteo에서 현재 대기질을 조회합니다.
export const fetchAirQuality = async (latitude, longitude) => {
  const { data } = await airQualityClient.get('/air-quality', {
    params: {
      latitude,
      longitude,
      current: 'us_aqi,pm10,pm2_5',
      timezone: 'auto',
    },
  })

  return {
    aqi: Math.round(data.current.us_aqi),
    pm10: data.current.pm10,
    pm25: data.current.pm2_5,
    measuredAt: data.current.time,
  }
}

export const fetchWeatherDetails = async (city) => {
  const [forecast, airQuality] = await Promise.all([fetchFiveDayForecast(city.id), fetchAirQuality(city.latitude, city.longitude)])

  return { forecast, airQuality }
}

export const getWeatherErrorMessage = (error) => {
  if (error.code === 'ECONNABORTED') {
    return '요청 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.'
  }

  if (error.response?.status === 401) {
    return 'OpenWeather API 키를 확인해 주세요.'
  }

  if (error.response?.status === 429) {
    return 'API 요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.'
  }

  return error.message || '날씨 정보를 불러오지 못했습니다.'
}
