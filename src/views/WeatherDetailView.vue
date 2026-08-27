<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

// API 연동 전까지 상세 페이지에서 사용할 임시 Mock 데이터입니다.
const mockDetails = {
  city_01: {
    name: '서울특별시',
    temp: 28,
    status: '맑음',
    humidity: '55%',
    wind: '2.5m/s',
  },
  city_02: {
    name: '경기도 수원시',
    temp: 24,
    status: '비',
    humidity: '85%',
    wind: '4.1m/s',
  },
  city_03: {
    name: '부산광역시',
    temp: 26,
    status: '구름',
    humidity: '65%',
    wind: '5.0m/s',
  },
  city_04: {
    name: '제주특별자치도',
    temp: 23,
    status: '바람',
    humidity: '72%',
    wind: '7.2m/s',
  },
}

const cityData = ref(null)

const displayTemp = computed(() => {
  if (!cityData.value) return null

  const rawTemp = cityData.value.temp
  return configStore.unit === 'fahrenheit' ? Math.round((rawTemp * 9) / 5 + 32) : rawTemp
})

onMounted(() => {
  cityData.value = mockDetails[route.params.cityId] ?? null
})
</script>

<template>
  <div class="detail-container">
    <h3>📊 지역별 상세 기상 관측 정보</h3>

    <div v-if="cityData" class="info-card">
      <h4>📍 {{ cityData.name }}</h4>
      <p>
        현재 기온: <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
      </p>
      <p>기상 현황: {{ cityData.status }}</p>
      <p>대기 습도: {{ cityData.humidity }}</p>
      <p>현재 풍속: {{ cityData.wind }}</p>
    </div>

    <p v-else class="empty-message">해당 도시의 상세 데이터가 존재하지 않습니다.</p>

    <button type="button" class="back-button" @click="router.push('/')">
      ← 메인 대시보드로 돌아가기
    </button>
  </div>
</template>

<style scoped>
.detail-container {
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

h3 {
  margin-top: 0;
}

.info-card {
  padding: 16px;
  margin: 16px 0;
  background: #f1f5f9;
  border-radius: 6px;
}

.info-card h4 {
  margin-top: 0;
}

.info-card p:last-child {
  margin-bottom: 0;
}

.empty-message {
  padding: 20px;
  color: #b91c1c;
  text-align: center;
  background: #fef2f2;
  border-radius: 6px;
}

.back-button {
  padding: 9px 13px;
  color: #ffffff;
  background: #334155;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
</style>
