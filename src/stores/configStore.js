import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // state: 원본 날씨 데이터가 표시될 온도 단위입니다.
  const unit = ref('celsius')

  // 개인 state: 사용자가 단위를 변경한 횟수를 기록합니다.
  const unitChangeCount = ref(0)

  // getters: 현재 단위의 기호와 한글 이름을 계산합니다.
  const unitSymbol = computed(() => (unit.value === 'celsius' ? '℃' : '℉'))
  const unitLabel = computed(() => (unit.value === 'celsius' ? '섭씨' : '화씨'))

  // action: 섭씨와 화씨 상태를 전환합니다.
  const toggleUnit = () => {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
    unitChangeCount.value += 1
  }

  // 개인 action: 단위와 변경 횟수를 초기 상태로 되돌립니다.
  const resetUnit = () => {
    unit.value = 'celsius'
    unitChangeCount.value = 0
  }

  return {
    unit,
    unitChangeCount,
    unitSymbol,
    unitLabel,
    toggleUnit,
    resetUnit,
  }
})
