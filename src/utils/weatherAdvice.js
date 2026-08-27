export const getWeatherAdviceTypes = (todayForecast) => {
  if (!todayForecast) return []

  const adviceTypes = []

  if (todayForecast.hasRain) {
    adviceTypes.push('umbrella')
  }

  if (todayForecast.temperatureRange >= 10) {
    adviceTypes.push('outerwear')
  }

  return adviceTypes
}
