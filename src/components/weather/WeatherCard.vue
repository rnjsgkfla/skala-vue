<script setup>
defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <article
    class="weather-card"
    @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)"
  >
    <h3>{{ cityItem.name }} ({{ cityItem.status }})</h3>
    <p>현재 기온: {{ cityItem.temp }}°C</p>

    <span v-if="cityItem.temp >= 25" class="badge hot">🔥 더움 (25도 이상)</span>
    <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>

    <button
      type="button"
      class="btn-detail"
      @click.stop="emit('click-detail', cityItem.name, cityItem.status)"
    >
      상세보기
    </button>
  </article>
</template>

<style scoped>
.weather-card {
  position: relative;
  padding: 14px;
  margin-top: 10px;
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
}

h3,
p {
  margin: 0 0 10px;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  color: #ffffff;
  font-size: 12px;
  border-radius: 4px;
}

.hot {
  background-color: #ff7675;
}

.cool {
  background-color: #74b9ff;
}

.btn-detail {
  position: absolute;
  top: 15px;
  right: 12px;
  padding: 6px 10px;
  cursor: pointer;
}
</style>
