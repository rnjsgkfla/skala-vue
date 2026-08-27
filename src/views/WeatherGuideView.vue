<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="guide-page">
    <p class="eyebrow">CUSTOM ROUTE</p>
    <h3>🧭 날씨 대시보드 이용 안내</h3>

    <ol>
      <li><strong>도시 검색</strong><span>도시명의 일부를 입력해 결과를 좁힙니다.</span></li>
      <li><strong>온도 필터</strong><span>25도 이상인 도시만 모아 봅니다.</span></li>
      <li><strong>상세보기</strong><span>도시별 습도와 풍속을 확인합니다.</span></li>
    </ol>

    <button type="button" @click="router.push('/practice/04')">Router 실습으로 돌아가기</button>
  </div>
</template>

<style scoped>
.guide-page {
  padding: 20px;
  background: #ffffff;
  border: 1px solid #dbeafe;
  border-radius: 8px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #2563eb;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

h3 {
  margin-top: 0;
}

ol {
  display: grid;
  gap: 10px;
  padding-left: 28px;
}

li {
  padding: 10px;
  background: #eff6ff;
  border-radius: 6px;
}

li strong,
li span {
  display: block;
}

li span {
  margin-top: 4px;
  color: #64748b;
  font-size: 0.9rem;
}

button {
  padding: 9px 13px;
  color: #ffffff;
  background: #2563eb;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
</style>
