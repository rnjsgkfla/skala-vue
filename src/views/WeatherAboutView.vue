<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="information-page">
    <h3>ℹ️ 서비스 소개</h3>

    <div class="description-box">
      <p>Vue 3와 Vue Router로 만든 실습용 날씨 대시보드입니다.</p>
      <ul>
        <li>재사용 가능한 날씨 컴포넌트로 화면 구성</li>
        <li>새로고침 없이 View를 전환하는 클라이언트 라우팅</li>
        <li>동적 경로를 이용한 도시별 상세 화면 제공</li>
      </ul>
    </div>

    <button type="button" @click="router.push('/')">대시보드 홈으로 이동</button>
  </div>
</template>

<style scoped>
.information-page {
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

h3 {
  margin-top: 0;
}

.description-box {
  padding: 14px;
  line-height: 1.6;
  background: #f8fafc;
  border-radius: 6px;
}

ul {
  padding-left: 20px;
  margin-bottom: 0;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 16px;
  color: #ffffff;
  font-weight: 700;
  background: #2563eb;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
</style>
