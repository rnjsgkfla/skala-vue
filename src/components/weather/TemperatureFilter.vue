<script setup>
defineProps({
  onlyHotCities: {
    type: Boolean,
    default: false,
  },
  hotCityCount: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update-only-hot'])

const handleChange = (event) => {
  emit('update-only-hot', event.target.checked)
}
</script>

<template>
  <label class="filter-option">
    <input type="checkbox" :checked="onlyHotCities" @change="handleChange" />
    25도 이상인 도시만 보기 ({{ hotCityCount }}개)
  </label>
</template>

<style scoped>
.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  color: #475569;
  font-size: 0.9rem;
  cursor: pointer;
}

input {
  width: 16px;
  height: 16px;
}
</style>
