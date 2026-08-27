<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="not-found-page">
    <div class="error-icon">☀️❓</div>
    <h3>페이지를 찾을 수 없습니다.</h3>
    <p>요청한 주소가 존재하지 않거나 아직 개발되지 않았습니다.</p>
    <button type="button" @click="router.push('/')">날씨 메인으로 이동</button>
  </div>
</template>

<style scoped>
.not-found-page {
  padding: 48px 24px;
  text-align: center;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}

.error-icon {
  margin-bottom: 16px;
  font-size: 4rem;
}

h3 {
  margin: 0 0 10px;
  font-size: 1.5rem;
}

p {
  margin: 0 0 24px;
  color: #64748b;
}

button {
  padding: 10px 18px;
  color: #ffffff;
  background: #2563eb;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
}
</style>
