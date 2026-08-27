<script setup>
import { ref } from 'vue'

// 이후 API 연동을 대비한 가상의 날씨 데이터입니다.
// v-for로 목록을 출력하고, id는 각 항목을 구분하는 :key로 사용합니다.
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  // 개인 커스터마이징: 기본 데이터에 제주 날씨를 추가했습니다.
  { id: 'city_04', name: '제주', temp: 23, status: '바람' },
])

// 입력값과 카드 선택 결과처럼 화면에서 바뀌는 값을 ref로 관리합니다.
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 상세보기 버튼에는 .stop을 적용해 카드의 클릭 이벤트와 구분합니다.
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

// 개인 커스터마이징: 입력값이 있을 때 검색어를 간단히 초기화합니다.
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

      <!-- v-model 대신 :value와 @input을 사용해 한글 입력값을 직접 연결합니다. -->
      <input
        type="text"
        :value="searchQuery"
        placeholder="검색할 도시 이름 입력"
        @input="(event) => (searchQuery = event.target.value)"
      />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </section>

    <section class="list-box">
      <h2>🏙️ 지역별 날씨 현황</h2>

      <article
        v-for="item in weatherList"
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
}

h2 {
  margin: 0 0 16px;
  font-size: 1.15rem;
}

.section-title h2 {
  margin-bottom: 0;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 14px;
  font-size: 14px;
  border: 1px solid #ced4da;
  border-radius: 6px;
}

.search-box p {
  min-height: 24px;
  margin: 10px 0 0;
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

.weather-card {
  position: relative;
  padding: 14px;
  margin-bottom: 10px;
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
}

.weather-card:last-child {
  margin-bottom: 0;
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

.status-bar {
  padding: 12px;
  color: #2e7d32;
  font-weight: 700;
  text-align: center;
  background: #e8f5e9;
  border-radius: 6px;
}
</style>
