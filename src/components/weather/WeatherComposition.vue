<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

// 1단계 Mockup에서 만든 반응형 날씨 데이터를 그대로 사용합니다.
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '제주', temp: 23, status: '바람' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 개인 커스터마이징: 더운 도시만 확인할 수 있는 반응형 상태입니다.
const onlyHotCities = ref(false)

// 검색어와 온도 조건이 바뀔 때 필요한 도시 목록을 다시 계산합니다.
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

// 개인 커스터마이징: 원본 목록에서 25도 이상인 도시 개수를 계산합니다.
const hotCityCount = computed(
  () => weatherList.value.filter((item) => item.temp >= 25).length,
)

// 선택 결과의 변화를 명시적으로 감시합니다.
watch(selectedCityInfo, (newInfo, oldInfo) => {
  console.log(`[watch] 선택 상태 변경: "${oldInfo}" → "${newInfo}"`)
})

// 개인 커스터마이징: 온도 필터가 변경되면 사용자에게 현재 조건을 안내합니다.
watch(onlyHotCities, (isEnabled) => {
  selectedCityInfo.value = isEnabled
    ? '25도 이상인 도시만 표시합니다.'
    : '전체 온도의 도시를 표시합니다.'
})

// 내부에서 참조한 검색어가 변경될 때마다 자동으로 실행됩니다.
watchEffect(() => {
  console.log(
    `[watchEffect] 검색어 '${searchQuery.value}'의 결과는 ${filteredWeatherList.value.length}개입니다.`,
  )
})

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

const clearSearch = () => {
  searchQuery.value = ''
  selectedCityInfo.value = '검색어를 초기화했습니다.'
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="search-box">
      <div class="section-title">
        <h2>🔍 도시 검색</h2>
        <button v-if="searchQuery" type="button" class="btn-reset" @click="clearSearch">
          초기화
        </button>
      </div>

      <input
        type="text"
        :value="searchQuery"
        placeholder="검색할 도시 이름 입력"
        @input="(event) => (searchQuery = event.target.value)"
      />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>

      <label class="filter-option">
        <input
          type="checkbox"
          :checked="onlyHotCities"
          @change="(event) => (onlyHotCities = event.target.checked)"
        />
        25도 이상인 도시만 보기 ({{ hotCityCount }}개)
      </label>
    </section>

    <section class="list-box">
      <div class="section-title">
        <h2>🏙️ 지역별 날씨 현황</h2>
        <span class="result-count">{{ filteredWeatherList.length }}개 도시</span>
      </div>

      <article
        v-for="item in filteredWeatherList"
        :key="item.id"
        class="weather-card"
        @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
      >
        <h3>{{ item.name }} ({{ item.status }})</h3>
        <p>현재 기온: {{ item.temp }}°C</p>

        <span v-if="item.temp >= 25" class="badge hot">🔥 더움 (25도 이상)</span>
        <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>

        <button
          type="button"
          class="btn-detail"
          @click.stop="showDetail(item.name, item.status)"
        >
          상세보기
        </button>
      </article>

      <p v-if="filteredWeatherList.length === 0" class="empty-message">
        😭 검색 결과와 일치하는 도시가 없습니다.
      </p>
    </section>

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

.search-box,
.list-box {
  padding: 18px;
  margin-bottom: 16px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

h2 {
  margin: 0 0 16px;
  font-size: 1.15rem;
}

.section-title h2 {
  margin-bottom: 0;
}

input[type='text'] {
  width: 100%;
  padding: 10px;
  margin-top: 14px;
  font-size: 14px;
  border: 1px solid #ced4da;
  border-radius: 6px;
}

.search-box p {
  min-height: 24px;
  margin: 10px 0;
  color: #6b7280;
}

.btn-reset {
  padding: 6px 10px;
  color: #475569;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  cursor: pointer;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  color: #475569;
  font-size: 0.9rem;
  cursor: pointer;
}

.filter-option input {
  width: 16px;
  height: 16px;
}

.result-count {
  color: #64748b;
  font-size: 0.85rem;
}

.weather-card {
  position: relative;
  padding: 14px;
  margin-top: 10px;
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
}

.weather-card h3,
.weather-card p {
  margin: 0 0 10px;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  color: #ffffff;
  font-size: 12px;
  border-radius: 4px;
}

.hot {
  background-color: #ff7675;
}

.cool {
  background-color: #74b9ff;
}

.btn-detail {
  position: absolute;
  top: 15px;
  right: 12px;
  padding: 6px 10px;
  cursor: pointer;
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
