<script setup>
import { computed, onMounted, ref } from 'vue'

import BaseDashboardCard from '@/components/weather/BaseDashboardCard.vue'
import SearchBar from '@/components/weather/SearchBar.vue'
import TemperatureFilter from '@/components/weather/TemperatureFilter.vue'
import UnitToggler from '@/components/weather/UnitToggler.vue'
import WeatherCard from '@/components/weather/WeatherCard.vue'
import { fetchWeatherDashboard, fetchWeatherDetails, getWeatherErrorMessage } from '@/services/weatherApi'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()

const weatherList = ref([])
const searchQuery = ref('')
const onlyHotCities = ref(false)
const selectedCityInfo = ref('실시간 날씨 카드를 선택해 보세요.')
const selectedCity = ref(null)
const forecast = ref([])
const airQuality = ref(null)
const isLoading = ref(false)
const isDetailLoading = ref(false)
const errorMessage = ref('')
const detailErrorMessage = ref('')
const lastUpdatedAt = ref(null)

const filteredWeatherList = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()

  return weatherList.value.filter((city) => {
    const matchesQuery = city.name.toLowerCase().includes(normalizedQuery)
    const matchesTemperature = !onlyHotCities.value || city.temp >= 25
    return matchesQuery && matchesTemperature
  })
})

const hotCityCount = computed(() => weatherList.value.filter((city) => city.temp >= 25).length)

const formattedLastUpdatedAt = computed(() => {
  if (!lastUpdatedAt.value) return ''

  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(lastUpdatedAt.value)
})

const airQualityLabel = computed(() => {
  const aqi = airQuality.value?.aqi

  if (aqi == null) return ''
  if (aqi <= 50) return '좋음'
  if (aqi <= 100) return '보통'
  if (aqi <= 150) return '민감군 주의'
  if (aqi <= 200) return '나쁨'
  return '매우 나쁨'
})

const displayTemp = (temp) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32)
  }

  return temp
}

const formatForecastDate = (date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date(`${date}T12:00:00`))
}

const loadWeather = async () => {
  isLoading.value = true
  errorMessage.value = ''
  selectedCity.value = null

  try {
    weatherList.value = await fetchWeatherDashboard()
    lastUpdatedAt.value = new Date()
    selectedCityInfo.value = 'OpenWeather에서 최신 날씨를 불러왔습니다.'
  } catch (error) {
    errorMessage.value = getWeatherErrorMessage(error)
  } finally {
    isLoading.value = false
  }
}

const openDetails = async (city) => {
  selectedCity.value = city
  selectedCityInfo.value = `${city.name}의 예보와 대기질을 조회합니다.`
  forecast.value = []
  airQuality.value = null
  detailErrorMessage.value = ''
  isDetailLoading.value = true

  try {
    const details = await fetchWeatherDetails(city)
    forecast.value = details.forecast
    airQuality.value = details.airQuality
    selectedCityInfo.value = `${city.name}의 상세 정보를 불러왔습니다.`
  } catch (error) {
    detailErrorMessage.value = getWeatherErrorMessage(error)
  } finally {
    isDetailLoading.value = false
  }
}

onMounted(loadWeather)
</script>

<template>
  <div class="axios-dashboard">
    <header class="dashboard-header">
      <div>
        <p class="eyebrow">OpenWeather + Open-Meteo</p>
        <h3>🌐 실시간 날씨 대시보드</h3>
      </div>
      <UnitToggler />
    </header>

    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="searchQuery = $event" @clear-query="searchQuery = ''" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <div class="list-heading">
        <h3>🗺️ 지역별 현재 날씨</h3>
        <button type="button" class="refresh-button" :disabled="isLoading" @click="loadWeather">
          {{ isLoading ? '불러오는 중...' : '새로고침' }}
        </button>
      </div>

      <TemperatureFilter :only-hot-cities="onlyHotCities" :hot-city-count="hotCityCount" @update-only-hot="onlyHotCities = $event" />

      <p v-if="formattedLastUpdatedAt" class="updated-at">마지막 갱신: {{ formattedLastUpdatedAt }} · OpenWeather</p>
      <p v-if="isLoading" class="state-message">실시간 날씨를 불러오고 있습니다.</p>
      <div v-else-if="errorMessage" class="error-message" role="alert">
        <strong>날씨 조회 실패</strong>
        <span>{{ errorMessage }}</span>
        <button type="button" @click="loadWeather">다시 시도</button>
      </div>
      <template v-else>
        <WeatherCard v-for="city in filteredWeatherList" :key="city.id" :city-item="city" @select-card="selectedCityInfo = $event" @click-detail="openDetails(city)" />
        <p v-if="filteredWeatherList.length === 0" class="state-message">현재 조건에 맞는 도시가 없습니다.</p>
      </template>
    </BaseDashboardCard>

    <p class="selection-message">{{ selectedCityInfo }}</p>

    <BaseDashboardCard v-if="selectedCity">
      <h3>📅 {{ selectedCity.name }} 상세 정보</h3>
      <p v-if="isDetailLoading" class="state-message">예보와 대기질을 함께 조회하고 있습니다.</p>
      <p v-else-if="detailErrorMessage" class="error-text" role="alert">
        {{ detailErrorMessage }}
      </p>
      <div v-else class="detail-grid">
        <section class="forecast-panel">
          <h4>5일 예보 <small>OpenWeather</small></h4>
          <ul>
            <li v-for="item in forecast" :key="item.date">
              <strong>{{ formatForecastDate(item.date) }}</strong>
              <span>{{ item.status }}</span>
              <b>{{ displayTemp(item.temp) }}{{ configStore.unitSymbol }}</b>
            </li>
          </ul>
        </section>

        <section v-if="airQuality" class="air-panel">
          <h4>현재 대기질 <small>Open-Meteo</small></h4>
          <div class="aqi-value">{{ airQuality.aqi }} <span>US AQI</span></div>
          <p class="aqi-label">{{ airQualityLabel }}</p>
          <dl>
            <div>
              <dt>PM10</dt>
              <dd>{{ airQuality.pm10 }} ㎍/㎥</dd>
            </div>
            <div>
              <dt>PM2.5</dt>
              <dd>{{ airQuality.pm25 }} ㎍/㎥</dd>
            </div>
          </dl>
        </section>
      </div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.axios-dashboard {
  width: min(600px, 100%);
  margin: 0 auto;
}

.dashboard-header,
.list-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.dashboard-header {
  padding: 15px 18px;
  margin-bottom: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.eyebrow {
  margin: 0 0 4px;
  color: #2563eb;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h3,
h4,
p {
  margin-top: 0;
}

.dashboard-header h3,
.list-heading h3 {
  margin-bottom: 0;
}

.refresh-button,
.error-message button {
  padding: 7px 11px;
  color: #ffffff;
  font-weight: 700;
  background: #2563eb;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.refresh-button:disabled {
  cursor: wait;
  opacity: 0.6;
}

.updated-at {
  margin: 12px 0 2px;
  color: #64748b;
  font-size: 0.78rem;
}

.state-message,
.selection-message {
  color: #64748b;
  text-align: center;
}

.selection-message {
  padding: 12px;
  background: #eaf8ee;
  border-radius: 6px;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  margin-top: 14px;
  color: #991b1b;
  background: #fef2f2;
  border-radius: 6px;
}

.error-message span {
  flex: 1;
}

.error-text {
  color: #b91c1c;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(150px, 0.8fr);
  gap: 14px;
}

.forecast-panel,
.air-panel {
  padding: 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
}

h4 small {
  color: #64748b;
  font-size: 0.68rem;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 8px;
  padding: 9px 0;
  font-size: 0.82rem;
  border-top: 1px solid #f1f5f9;
}

li span {
  color: #64748b;
}

.aqi-value {
  color: #2563eb;
  font-size: 2rem;
  font-weight: 800;
}

.aqi-value span {
  font-size: 0.7rem;
}

.aqi-label {
  color: #475569;
  font-weight: 700;
}

dl div {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.78rem;
}

dd {
  margin: 0;
  font-weight: 700;
}

@media (max-width: 560px) {
  .dashboard-header,
  .error-message {
    align-items: flex-start;
    flex-direction: column;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
