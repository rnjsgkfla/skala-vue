<script setup>
import WeatherUiDashboard from '@/components/weather/WeatherUiDashboard.vue'
</script>

<template>
  <div class="final-view">
    <section class="hero-section">
      <p class="eyebrow">FINAL WEATHER APPLICATION</p>
      <h1>오늘의 날씨를 한눈에 확인하세요.</h1>
      <p class="hero-description">실시간 날씨, 5일 예보, 대기질을 한곳에서 확인하고 자주 보는 도시를 즐겨찾기로 관리할 수 있습니다.</p>
      <div class="feature-list" aria-label="주요 기술"><span>Vue 3</span><span>Pinia</span><span>Axios</span><span>Element Plus</span></div>
    </section>

    <WeatherUiDashboard final-mode />
  </div>
</template>

<style scoped>
.final-view {
  width: min(900px, calc(100% - 32px));
  padding: 54px 0 30px;
  margin: 0 auto;
}

.hero-section {
  padding: 48px;
  margin-bottom: 28px;
  color: #ffffff;
  background: radial-gradient(circle at 85% 15%, rgba(125, 211, 252, 0.35), transparent 28%), linear-gradient(135deg, #172554, #1d4ed8 58%, #0284c7);
  border-radius: 24px;
  box-shadow: 0 20px 45px rgba(30, 64, 175, 0.2);
}

.eyebrow {
  margin: 0 0 10px;
  color: #bae6fd;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

h1 {
  max-width: 620px;
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.12;
}

.hero-description {
  max-width: 630px;
  margin: 18px 0 24px;
  color: #dbeafe;
  line-height: 1.7;
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-list span {
  padding: 7px 11px;
  font-size: 0.73rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
}

@media (max-width: 600px) {
  .final-view {
    padding-top: 24px;
  }

  .hero-section {
    padding: 30px 24px;
    border-radius: 18px;
  }
}
</style>
