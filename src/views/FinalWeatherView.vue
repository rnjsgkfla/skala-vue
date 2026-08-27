<script setup>
import WeatherUiDashboard from '@/components/weather/WeatherUiDashboard.vue'
</script>

<template>
  <div class="final-view">
    <section class="hero-section">
      <p class="today-label">오늘의 날씨</p>
      <h1>외출 전에 날씨를 확인해 보세요.</h1>
      <p class="hero-description">현재 날씨와 5일 예보, 대기질을 확인하고 자주 보는 도시는 즐겨찾기에 저장할 수 있습니다.</p>
    </section>

    <WeatherUiDashboard final-mode />
  </div>
</template>

<style scoped>
.final-view {
  width: min(900px, calc(100% - 32px));
  padding: 40px 0 30px;
  margin: 0 auto;
}

.hero-section {
  padding: 12px 0 24px;
  margin-bottom: 16px;
  color: #172033;
  border-bottom: 1px solid #dfe4ea;
}

.today-label {
  margin: 0 0 8px;
  color: #2563eb;
  font-size: 0.8rem;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  line-height: 1.25;
}

.hero-description {
  max-width: 680px;
  margin: 12px 0 0;
  color: #606b7a;
  line-height: 1.65;
}

@media (max-width: 600px) {
  .final-view {
    padding-top: 24px;
  }

  .hero-section {
    padding-top: 4px;
  }
}
</style>
