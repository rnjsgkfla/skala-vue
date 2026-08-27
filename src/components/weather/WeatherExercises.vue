<script setup>
import WeatherComposition from './WeatherComposition.vue'
import WeatherMockup from './WeatherMockup.vue'
import WeatherParent from './WeatherParent.vue'
</script>

<template>
  <section class="weather-exercises">
    <header class="page-header">
      <p>SKALA Vue Hands-on</p>
      <h1>Weather Exercises</h1>
    </header>

    <section class="exercise-stage">
      <h2><span>01</span> Weather Mockup</h2>
      <WeatherMockup />
    </section>

    <section class="exercise-stage">
      <h2><span>02</span> Weather Composition</h2>
      <WeatherComposition />
    </section>

    <section class="exercise-stage">
      <h2><span>03</span> Weather Component</h2>
      <WeatherParent />
    </section>
  </section>
</template>

<style scoped>
.weather-exercises {
  width: min(720px, calc(100% - 32px));
  margin: 0 auto;
  padding: 56px 0 36px;
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

.exercise-stage {
  padding: 28px 0;
  border-top: 1px solid #cbd5e1;
}

.exercise-stage + .exercise-stage {
  margin-top: 36px;
}

.exercise-stage > h2 {
  width: min(600px, 100%);
  margin: 0 auto 20px;
  color: #172033;
  font-size: 1.35rem;
}

.exercise-stage > h2 span {
  display: inline-grid;
  width: 32px;
  height: 32px;
  margin-right: 6px;
  place-items: center;
  color: #ffffff;
  font-size: 0.8rem;
  background: #2563eb;
  border-radius: 50%;
}
</style>
