<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import TemperatureFilter from './TemperatureFilter.vue'
import WeatherCard from './WeatherCard.vue'

// 상태와 비즈니스 로직은 부모 컴포넌트에서 관리합니다.
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '제주', temp: 23, status: '바람' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
const onlyHotCities = ref(false)

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  let result = query
    ? weatherList.value.filter((item) => item.name.includes(query))
    : weatherList.value

  if (onlyHotCities.value) {
    result = result.filter((item) => item.temp >= 25)
  }

  return result
})

const hotCityCount = computed(
  () => weatherList.value.filter((item) => item.temp >= 25).length,
)

watch(selectedCityInfo, (newInfo, oldInfo) => {
  console.log(`[watch] 선택 상태 변경: "${oldInfo}" → "${newInfo}"`)
})

watch(onlyHotCities, (isEnabled) => {
  selectedCityInfo.value = isEnabled
    ? '25도 이상인 도시만 표시합니다.'
    : '전체 온도의 도시를 표시합니다.'
})

watchEffect(() => {
  console.log(
    `[watchEffect] 검색어 '${searchQuery.value}'의 결과는 ${filteredWeatherList.value.length}개입니다.`,
  )
})

const clearSearch = () => {
  searchQuery.value = ''
  selectedCityInfo.value = '검색어를 초기화했습니다.'
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar
        :current-query="searchQuery"
        @update-query="(query) => (searchQuery = query)"
        @clear-query="clearSearch"
      />

      <!-- 개인 추가 컴포넌트도 부모의 상태를 props와 emits로 연결합니다. -->
      <TemperatureFilter
        :only-hot-cities="onlyHotCities"
        :hot-city-count="hotCityCount"
        @update-only-hot="(isEnabled) => (onlyHotCities = isEnabled)"
      />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <div class="section-title">
        <h3>🏙️ 지역별 날씨 현황</h3>
        <span>{{ filteredWeatherList.length }}개 도시</span>
      </div>

      <WeatherCard
        v-for="item in filteredWeatherList"
        :key="item.id"
        :city-item="item"
        @select-card="(message) => (selectedCityInfo = message)"
        @click-detail="showDetail"
      />

      <p v-if="filteredWeatherList.length === 0" class="empty-message">
        😭 검색 결과와 일치하는 도시가 없습니다.
      </p>
    </BaseDashboardCard>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: min(600px, 100%);
  margin: 0 auto;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.section-title h3 {
  margin: 0;
  font-size: 1.15rem;
}

.section-title span {
  color: #64748b;
  font-size: 0.85rem;
}

.empty-message {
  padding: 18px 0 8px;
  margin: 0;
  color: #e74c3c;
  text-align: center;
}

.status-bar {
  padding: 12px;
  color: #2e7d32;
  font-weight: 700;
  text-align: center;
  background: #e8f5e9;
  border-radius: 6px;
}
</style>
