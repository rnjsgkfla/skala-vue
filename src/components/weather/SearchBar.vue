<script setup>
const emit = defineEmits(['update-query', 'clear-query'])

defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})

const handleInput = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search-inner">
    <div class="section-title">
      <h3>🔍 도시 검색</h3>
      <button
        v-if="currentQuery"
        type="button"
        class="btn-reset"
        @click="emit('clear-query')"
      >
        초기화
      </button>
    </div>

    <input
      type="text"
      :value="currentQuery"
      placeholder="검색할 도시 이름 입력"
      @input="handleInput"
    />
    <p>
      검색 중인 도시: <strong>{{ currentQuery }}</strong>
    </p>
  </div>
</template>

<style scoped>
.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

h3 {
  margin: 0;
  font-size: 1.15rem;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 14px;
  font-size: 14px;
  border: 1px solid #ced4da;
  border-radius: 6px;
}

p {
  min-height: 24px;
  margin: 10px 0;
  color: #6b7280;
}

.btn-reset {
  padding: 6px 10px;
  color: #475569;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  cursor: pointer;
}
</style>
