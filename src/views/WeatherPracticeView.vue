<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import UnitToggler from '@/components/weather/UnitToggler.vue'
import WeatherAxiosDashboard from '@/components/weather/WeatherAxiosDashboard.vue'
import WeatherComposition from '@/components/weather/WeatherComposition.vue'
import WeatherMockup from '@/components/weather/WeatherMockup.vue'
import WeatherParent from '@/components/weather/WeatherParent.vue'
import WeatherUiDashboard from '@/components/weather/WeatherUiDashboard.vue'
import WeatherHomeView from '@/views/WeatherHomeView.vue'

const route = useRoute()

const stages = {
  '01': {
    title: 'Weather Mockup',
    description: '반응형 상태와 Vue 디렉티브로 날씨 화면의 기초를 구성한 단계입니다.',
    component: WeatherMockup,
  },
  '02': {
    title: 'Weather Composition',
    description: 'computed, watch, watchEffect로 검색과 필터 로직을 확장한 단계입니다.',
    component: WeatherComposition,
  },
  '03': {
    title: 'Weather Component',
    description: '화면을 역할별 컴포넌트로 분리하고 props, emits, slot을 적용한 단계입니다.',
    component: WeatherParent,
  },
  '04': {
    title: 'Weather Router',
    description: 'Vue Router와 동적 경로를 사용해 목록과 상세 화면을 연결한 단계입니다.',
  },
  '05': {
    title: 'Weather Store',
    description: 'Pinia 전역 상태로 여러 화면의 온도 단위를 함께 관리한 단계입니다.',
  },
  '06': {
    title: 'Weather Axios',
    description: '실제 날씨, 5일 예보, 대기질 API를 Axios로 연동한 단계입니다.',
    component: WeatherAxiosDashboard,
  },
  '07': {
    title: 'Weather UI Library',
    description: 'Element Plus를 적용해 데이터 중심 날씨 UI를 구성한 단계입니다.',
    component: WeatherUiDashboard,
  },
}

const stageNumber = computed(() => String(route.params.stage).padStart(2, '0'))
const currentStage = computed(() => stages[stageNumber.value])
</script>

<template>
  <div v-if="currentStage" class="practice-view">
    <header class="practice-heading">
      <span>{{ stageNumber }}</span>
      <div>
        <p>WEATHER HANDS-ON HISTORY</p>
        <h1>{{ currentStage.title }}</h1>
        <small>{{ currentStage.description }}</small>
      </div>
    </header>

    <section class="practice-content">
      <component :is="currentStage.component" v-if="currentStage.component" :key="stageNumber" />

      <template v-else-if="stageNumber === '04'">
        <nav class="practice-subnav" aria-label="Router 실습 보조 메뉴">
          <RouterLink to="/practice/04">날씨 대시보드</RouterLink>
          <RouterLink to="/about">서비스 소개</RouterLink>
          <RouterLink to="/guide">이용 안내</RouterLink>
        </nav>
        <WeatherHomeView :key="stageNumber" />
      </template>

      <template v-else-if="stageNumber === '05'">
        <div class="store-toolbar">
          <strong>전역 온도 단위 설정</strong>
          <UnitToggler />
        </div>
        <WeatherHomeView :key="stageNumber" />
      </template>
    </section>
  </div>

  <div v-else class="invalid-stage">
    <h1>존재하지 않는 실습 단계입니다.</h1>
    <RouterLink to="/">최종 화면으로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.practice-view,
.invalid-stage {
  width: min(820px, calc(100% - 32px));
  padding: 44px 0 40px;
  margin: 0 auto;
}

.practice-heading {
  display: flex;
  align-items: center;
  gap: 18px;
  padding-bottom: 24px;
  margin-bottom: 26px;
  border-bottom: 1px solid #cbd5e1;
}

.practice-heading > span {
  display: grid;
  flex: 0 0 auto;
  width: 58px;
  height: 58px;
  place-items: center;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 800;
  background: #2563eb;
  border-radius: 18px;
}

.practice-heading p,
.practice-heading h1,
.practice-heading small {
  margin: 0;
}

.practice-heading p {
  color: #2563eb;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.practice-heading h1 {
  margin: 3px 0 5px;
  color: #172033;
  font-size: 1.75rem;
}

.practice-heading small {
  color: #64748b;
}

.practice-content {
  width: min(700px, 100%);
  margin: 0 auto;
}

.practice-subnav,
.store-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  margin-bottom: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 9px;
}

.practice-subnav a {
  padding: 7px 10px;
  color: #64748b;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 6px;
}

.practice-subnav a:hover,
.practice-subnav a.router-link-exact-active {
  color: #1d4ed8;
  background: #eff6ff;
}

.store-toolbar {
  justify-content: space-between;
  color: #334155;
}

.invalid-stage {
  text-align: center;
}

@media (max-width: 540px) {
  .practice-view {
    padding-top: 28px;
  }

  .practice-heading {
    align-items: flex-start;
  }

  .practice-heading > span {
    width: 48px;
    height: 48px;
    border-radius: 14px;
  }

  .practice-heading h1 {
    font-size: 1.35rem;
  }
}
</style>
