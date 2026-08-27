<script setup>
import WeatherMockup from '@/components/weather/WeatherMockup.vue'
</script>

<template>
  <main class="weather-home">
    <header class="page-header">
      <p>SKALA Vue Hands-on · 01</p>
      <h1>Weather Mockup</h1>
    </header>

    <WeatherMockup />
  </main>
</template>

<style scoped>
.weather-home {
  width: min(720px, calc(100% - 32px));
  margin: 0 auto;
  padding: 56px 0 80px;
}

.page-header {
  width: min(600px, 100%);
  margin: 0 auto 28px;
}

.page-header p {
  margin: 0 0 8px;
  color: #2563eb;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0;
  color: #172033;
  font-size: clamp(2rem, 8vw, 3.5rem);
  letter-spacing: -0.04em;
}
</style>
