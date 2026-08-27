<script setup>
const practiceLinks = [
  { stage: '01', label: 'Mockup' },
  { stage: '02', label: 'Composition' },
  { stage: '03', label: 'Component' },
  { stage: '04', label: 'Router' },
  { stage: '05', label: 'Store' },
  { stage: '06', label: 'Axios' },
  { stage: '07', label: 'UI Library' },
]
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="header-inner">
        <RouterLink class="brand" to="/">
          <span class="brand-icon">🌤️</span>
          <span>
            <strong>Skala- My Weather 실습</strong>
            <small>P106 권하림</small>
          </span>
        </RouterLink>

        <nav class="stage-navigation" aria-label="날씨 실습 단계 이동">
          <RouterLink class="final-link" to="/">최종 화면</RouterLink>
          <RouterLink v-for="item in practiceLinks" :key="item.stage" :to="`/practice/${item.stage}`">
            <b>{{ item.stage }}</b>
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="app-content">
      <RouterView />
    </main>

    <footer class="app-footer">판교캠퍼스 P106 권하림 - SKALA Vue.js Weather 실습</footer>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
}

.app-header {
  position: sticky;
  z-index: 100;
  top: 0;
  color: #0f172a;
  background: rgba(56, 189, 248, 0.96);
  border-bottom: 1px solid #0ea5e9;
  backdrop-filter: blur(14px);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 28px;
  width: min(1180px, calc(100% - 32px));
  min-height: 74px;
  margin: 0 auto;
}

.brand {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 10px;
  color: #0f172a;
  text-decoration: none;
}

.brand-icon {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  font-size: 1.3rem;
  background: rgba(255, 255, 255, 0.72);
  border-radius: 13px;
}

.brand strong,
.brand small {
  display: block;
}

.brand small {
  margin-top: 2px;
  color: #075985;
  font-size: 0.66rem;
}

.stage-navigation {
  display: flex;
  flex: 1;
  align-items: stretch;
  gap: 5px;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: thin;
}

.stage-navigation a {
  display: grid;
  flex: 0 0 auto;
  min-width: 65px;
  min-height: 48px;
  padding: 7px 9px;
  place-content: center;
  color: #0c4a6e;
  font-size: 0.7rem;
  text-align: center;
  text-decoration: none;
  border-radius: 9px;
  transition: 0.2s ease;
}

.stage-navigation a b {
  color: #075985;
  font-size: 0.78rem;
}

.stage-navigation a:hover {
  color: #0f172a;
  background: rgba(255, 255, 255, 0.35);
}

.stage-navigation a.router-link-exact-active {
  color: #ffffff;
  background: #2563eb;
}

.stage-navigation a.router-link-exact-active b {
  color: #ffffff;
}

.stage-navigation .final-link {
  min-width: 78px;
  color: #0c4a6e;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.45);
}

.app-content {
  min-height: calc(100vh - 144px);
}

.app-footer {
  padding: 25px 16px;
  color: #64748b;
  font-size: 0.75rem;
  text-align: center;
}

@media (max-width: 760px) {
  .header-inner {
    align-items: stretch;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    padding: 12px 16px 8px;
  }

  .brand small {
    display: none;
  }

  .stage-navigation {
    width: 100%;
    padding-bottom: 4px;
  }

  .stage-navigation a {
    min-width: 60px;
    min-height: 42px;
  }
}
</style>
