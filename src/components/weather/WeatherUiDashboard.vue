<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  ElAlert,
  ElButton,
  ElCard,
  ElCol,
  ElDescriptions,
  ElDescriptionsItem,
  ElDivider,
  ElEmpty,
  ElInput,
  ElMessage,
  ElOption,
  ElRow,
  ElSelect,
  ElSkeleton,
  ElStatistic,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTag,
} from 'element-plus'

import UnitToggler from '@/components/weather/UnitToggler.vue'
import { fetchWeatherDashboard, fetchWeatherDetails, getWeatherErrorMessage } from '@/services/weatherApi'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  finalMode: {
    type: Boolean,
    default: false,
  },
})

const configStore = useConfigStore()

const loadFavoriteIds = () => {
  try {
    return JSON.parse(localStorage.getItem('weather-favorite-cities') ?? '[]')
  } catch {
    return []
  }
}

const weatherList = ref([])
const searchQuery = ref('')
const onlyHotCities = ref(false)
const onlyFavoriteCities = ref(false)
const sortOrder = ref('default')
const favoriteCityIds = ref(loadFavoriteIds())
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

  const result = weatherList.value.filter((city) => {
    const matchesQuery = city.name.toLowerCase().includes(normalizedQuery)
    const matchesTemperature = !onlyHotCities.value || city.temp >= 25
    const matchesFavorite = !props.finalMode || !onlyFavoriteCities.value || favoriteCityIds.value.includes(city.id)

    return matchesQuery && matchesTemperature && matchesFavorite
  })

  if (sortOrder.value === 'temp-desc') {
    return [...result].sort((a, b) => b.temp - a.temp)
  }

  if (sortOrder.value === 'temp-asc') {
    return [...result].sort((a, b) => a.temp - b.temp)
  }

  return result
})

const hotCityCount = computed(() => weatherList.value.filter((city) => city.temp >= 25).length)

const averageTemperature = computed(() => {
  if (!weatherList.value.length) return 0

  const total = weatherList.value.reduce((sum, city) => sum + city.temp, 0)
  return Math.round(total / weatherList.value.length)
})

const hottestCity = computed(() => {
  return weatherList.value.reduce((hottest, city) => (!hottest || city.temp > hottest.temp ? city : hottest), null)
})

const isFavorite = (cityId) => favoriteCityIds.value.includes(cityId)

const toggleFavorite = (city) => {
  favoriteCityIds.value = isFavorite(city.id) ? favoriteCityIds.value.filter((id) => id !== city.id) : [...favoriteCityIds.value, city.id]

  localStorage.setItem('weather-favorite-cities', JSON.stringify(favoriteCityIds.value))
  ElMessage.success(isFavorite(city.id) ? `${city.name}을 즐겨찾기에 추가했습니다.` : `${city.name}을 즐겨찾기에서 해제했습니다.`)
}

const formattedLastUpdatedAt = computed(() => {
  if (!lastUpdatedAt.value) return ''

  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(lastUpdatedAt.value)
})

const airQualityInfo = computed(() => {
  const aqi = airQuality.value?.aqi

  if (aqi == null) return { label: '', type: 'info' }
  if (aqi <= 50) return { label: '좋음', type: 'success' }
  if (aqi <= 100) return { label: '보통', type: 'warning' }
  if (aqi <= 150) return { label: '민감군 주의', type: 'warning' }
  return { label: aqi <= 200 ? '나쁨' : '매우 나쁨', type: 'danger' }
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

const loadWeather = async (showFeedback = false) => {
  isLoading.value = true
  errorMessage.value = ''
  selectedCity.value = null

  try {
    weatherList.value = await fetchWeatherDashboard()
    lastUpdatedAt.value = new Date()

    if (showFeedback) {
      ElMessage.success('최신 날씨로 갱신했습니다.')
    }
  } catch (error) {
    errorMessage.value = getWeatherErrorMessage(error)
    ElMessage.error('날씨를 불러오지 못했습니다.')
  } finally {
    isLoading.value = false
  }
}

const openDetails = async (city) => {
  selectedCity.value = city
  forecast.value = []
  airQuality.value = null
  detailErrorMessage.value = ''
  isDetailLoading.value = true

  try {
    const details = await fetchWeatherDetails(city)
    forecast.value = details.forecast
    airQuality.value = details.airQuality
    ElMessage.success(`${city.name} 상세 정보를 불러왔습니다.`)
  } catch (error) {
    detailErrorMessage.value = getWeatherErrorMessage(error)
    ElMessage.error('상세 정보를 불러오지 못했습니다.')
  } finally {
    isDetailLoading.value = false
  }
}

onMounted(loadWeather)
</script>

<template>
  <div class="ui-dashboard">
    <el-card class="control-card" shadow="never">
      <div class="dashboard-header">
        <div>
          <el-tag type="primary" effect="plain" round>
            {{ finalMode ? 'Final Application' : 'Element Plus' }}
          </el-tag>
          <h3>
            {{ finalMode ? '🌤️ My Weather Center' : '🌤️ Weather UI Dashboard' }}
          </h3>
          <p>
            {{ finalMode ? '즐겨찾기와 정렬로 나만의 날씨를 관리합니다.' : '실시간 날씨와 대기질을 UI 컴포넌트로 확인합니다.' }}
          </p>
        </div>
        <UnitToggler />
      </div>

      <el-divider />

      <el-row :gutter="12" align="middle">
        <el-col :xs="24" :sm="14">
          <el-input v-model="searchQuery" size="large" clearable placeholder="도시 이름으로 검색" aria-label="도시 이름으로 검색">
            <template #prefix>🔍</template>
          </el-input>
        </el-col>
        <el-col :xs="24" :sm="10" class="filter-column">
          <el-switch v-model="onlyHotCities" :active-text="`더운 도시만 (${hotCityCount})`" />
        </el-col>
      </el-row>

      <el-row v-if="finalMode" :gutter="12" class="final-controls" align="middle">
        <el-col :xs="24" :sm="12">
          <el-select v-model="sortOrder" aria-label="도시 정렬 순서">
            <el-option label="기본 순서" value="default" />
            <el-option label="기온 높은 순" value="temp-desc" />
            <el-option label="기온 낮은 순" value="temp-asc" />
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="12" class="filter-column favorite-filter">
          <el-switch v-model="onlyFavoriteCities" :active-text="`즐겨찾기만 (${favoriteCityIds.length})`" />
        </el-col>
      </el-row>
    </el-card>

    <el-row v-if="finalMode && !isLoading && weatherList.length" :gutter="12" class="summary-grid">
      <el-col :xs="24" :sm="8">
        <el-card shadow="never" class="summary-card">
          <span>조회 도시</span><strong>{{ weatherList.length }}곳</strong>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-card shadow="never" class="summary-card">
          <span>평균 기온</span>
          <strong>{{ displayTemp(averageTemperature) }}{{ configStore.unitSymbol }}</strong>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-card shadow="never" class="summary-card">
          <span>가장 더운 도시</span><strong>{{ hottestCity?.name ?? '-' }}</strong>
        </el-card>
      </el-col>
    </el-row>

    <div class="section-heading">
      <div>
        <h3>지역별 현재 날씨</h3>
        <span v-if="formattedLastUpdatedAt">마지막 갱신 {{ formattedLastUpdatedAt }}</span>
      </div>
      <el-button type="primary" :loading="isLoading" @click="loadWeather(true)"> 새로고침 </el-button>
    </div>

    <el-alert v-if="errorMessage" :title="errorMessage" type="error" show-icon :closable="false">
      <template #default>
        <el-button size="small" type="danger" plain @click="loadWeather(true)"> 다시 시도 </el-button>
      </template>
    </el-alert>

    <el-row v-else :gutter="14">
      <template v-if="isLoading">
        <el-col v-for="index in 4" :key="index" :xs="24" :sm="12">
          <el-card class="weather-ui-card" shadow="never">
            <el-skeleton :rows="3" animated />
          </el-card>
        </el-col>
      </template>

      <template v-else-if="filteredWeatherList.length">
        <el-col v-for="city in filteredWeatherList" :key="city.id" :xs="24" :sm="12">
          <el-card class="weather-ui-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <strong>{{ city.name }}</strong>
                <div class="card-actions">
                  <el-button v-if="finalMode" circle text :aria-label="`${city.name} 즐겨찾기 전환`" @click="toggleFavorite(city)">
                    {{ isFavorite(city.id) ? '★' : '☆' }}
                  </el-button>
                  <el-tag :type="city.temp >= 25 ? 'danger' : 'primary'" effect="light">
                    {{ city.temp >= 25 ? '더움' : '선선함' }}
                  </el-tag>
                </div>
              </div>
            </template>

            <div class="temperature">
              {{ displayTemp(city.temp) }}<small>{{ configStore.unitSymbol }}</small>
            </div>
            <p class="weather-status">{{ city.status }}</p>

            <el-descriptions :column="2" size="small" border>
              <el-descriptions-item label="습도">{{ city.humidity }}%</el-descriptions-item>
              <el-descriptions-item label="풍속"> {{ city.windSpeed }}m/s </el-descriptions-item>
            </el-descriptions>

            <el-button class="detail-button" type="primary" plain @click="openDetails(city)"> 예보·대기질 보기 </el-button>
          </el-card>
        </el-col>
      </template>

      <el-col v-else :span="24">
        <el-empty description="현재 조건에 맞는 도시가 없습니다." />
      </el-col>
    </el-row>

    <el-card v-if="selectedCity" class="detail-card" shadow="never">
      <template #header>
        <div class="card-header">
          <strong>📅 {{ selectedCity.name }} 상세 정보</strong>
          <el-tag effect="plain">OpenWeather + Open-Meteo</el-tag>
        </div>
      </template>

      <el-skeleton v-if="isDetailLoading" :rows="5" animated />
      <el-alert v-else-if="detailErrorMessage" :title="detailErrorMessage" type="error" show-icon :closable="false" />

      <el-row v-else :gutter="18">
        <el-col :xs="24" :md="16">
          <h4>5일 예보</h4>
          <el-table :data="forecast" stripe size="small" empty-text="예보가 없습니다.">
            <el-table-column label="날짜" min-width="110">
              <template #default="scope">{{ formatForecastDate(scope.row.date) }}</template>
            </el-table-column>
            <el-table-column prop="status" label="날씨" min-width="100" />
            <el-table-column label="기온" width="82" align="right">
              <template #default="scope"> {{ displayTemp(scope.row.temp) }}{{ configStore.unitSymbol }} </template>
            </el-table-column>
          </el-table>
        </el-col>

        <el-col :xs="24" :md="8" class="air-quality-column">
          <h4>현재 대기질</h4>
          <div v-if="airQuality" class="air-quality-panel">
            <el-statistic title="US AQI" :value="airQuality.aqi" />
            <el-tag :type="airQualityInfo.type" effect="dark">
              {{ airQualityInfo.label }}
            </el-tag>
            <el-descriptions :column="1" size="small" border>
              <el-descriptions-item label="PM10"> {{ airQuality.pm10 }} ㎍/㎥ </el-descriptions-item>
              <el-descriptions-item label="PM2.5"> {{ airQuality.pm25 }} ㎍/㎥ </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
.ui-dashboard {
  width: min(700px, 100%);
  margin: 0 auto;
}

.control-card,
.detail-card,
.weather-ui-card {
  border-radius: 10px;
}

.control-card,
.detail-card {
  margin-bottom: 18px;
}

.dashboard-header,
.card-header,
.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.dashboard-header h3 {
  margin: 10px 0 5px;
  color: #172033;
}

.dashboard-header p,
.section-heading span {
  margin: 0;
  color: #909399;
  font-size: 0.78rem;
}

.filter-column {
  display: flex;
  justify-content: flex-end;
}

.final-controls {
  padding-top: 14px;
  margin-top: 14px;
  border-top: 1px solid #ebeef5;
}

.final-controls :deep(.el-select) {
  width: 100%;
}

.summary-grid {
  margin-bottom: 8px;
}

.summary-card {
  margin-bottom: 12px;
  border: 0;
  background: linear-gradient(145deg, #eff6ff, #ffffff);
}

.summary-card :deep(.el-card__body) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.summary-card span {
  color: #64748b;
  font-size: 0.75rem;
}

.summary-card strong {
  color: #1d4ed8;
  font-size: 1.05rem;
}

.section-heading {
  margin: 22px 0 12px;
}

.section-heading h3,
h4 {
  margin: 0 0 4px;
}

.weather-ui-card {
  margin-bottom: 14px;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-actions :deep(.el-button) {
  color: #f59e0b;
  font-size: 1.25rem;
}

.temperature {
  color: #303133;
  font-size: 2.3rem;
  font-weight: 800;
}

.temperature small {
  margin-left: 3px;
  color: #606266;
  font-size: 1rem;
}

.weather-status {
  margin: 2px 0 14px;
  color: #606266;
}

.detail-button {
  width: 100%;
  margin-top: 14px;
}

.air-quality-column {
  border-left: 1px solid #ebeef5;
}

.air-quality-panel {
  display: grid;
  gap: 14px;
}

.air-quality-panel :deep(.el-tag) {
  width: fit-content;
}

@media (max-width: 767px) {
  .dashboard-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .filter-column {
    justify-content: flex-start;
    margin-top: 12px;
  }

  .favorite-filter {
    margin-top: 12px;
  }

  .air-quality-column {
    padding-top: 18px;
    margin-top: 18px;
    border-top: 1px solid #ebeef5;
    border-left: 0;
  }
}
</style>
