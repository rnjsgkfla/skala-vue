<script setup>
import WeatherExercises from '@/components/weather/WeatherExercises.vue'
import UnitToggler from '@/components/weather/UnitToggler.vue'
</script>

<template>
  <WeatherExercises />

  <section class="router-stage">
    <h2><span>04</span> Weather Router</h2>

    <div class="router-shell">
      <nav class="navigation-bar" aria-label="날씨 서비스 메뉴">
        <RouterLink to="/">🌦️ 날씨 대시보드</RouterLink>
        <RouterLink to="/about">ℹ️ 서비스 소개</RouterLink>
        <RouterLink to="/guide">🧭 이용 안내</RouterLink>
      </nav>

      <main class="route-content">
        <RouterView />
      </main>
    </div>
  </section>

  <section class="store-stage">
    <h2><span>05</span> Pinia Weather Store</h2>

    <div class="router-shell">
      <nav class="navigation-bar store-navigation" aria-label="날씨 Store 서비스 메뉴">
        <RouterLink to="/">🌦️ 날씨 대시보드</RouterLink>
        <RouterLink to="/about">ℹ️ 서비스 소개</RouterLink>
        <RouterLink to="/guide">🧭 이용 안내</RouterLink>
        <UnitToggler />
      </nav>

      <main class="route-content">
        <RouterView />
      </main>
    </div>
  </section>
</template>

<style scoped>
.router-stage,
.store-stage {
  width: min(720px, calc(100% - 32px));
  margin: 36px auto 0;
  padding: 28px 0 36px;
  border-top: 1px solid #cbd5e1;
}

.store-stage {
  padding-bottom: 80px;
}

.router-stage > h2,
.store-stage > h2 {
  width: min(600px, 100%);
  margin: 0 auto 20px;
  color: #172033;
  font-size: 1.35rem;
}

.router-stage > h2 span,
.store-stage > h2 span {
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

.router-shell {
  width: min(600px, 100%);
  margin: 0 auto;
}

.navigation-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 20px;
  padding: 14px;
  margin-bottom: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.navigation-bar a {
  padding: 5px 0;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 2px solid transparent;
}

.navigation-bar a:hover,
.navigation-bar a.router-link-exact-active {
  color: #2563eb;
  border-bottom-color: #2563eb;
}

.store-navigation {
  justify-content: flex-start;
}

.route-content {
  min-height: 240px;
}
</style>
