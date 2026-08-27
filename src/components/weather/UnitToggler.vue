<script setup>
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>
      날씨 단위:
      <strong>{{ configStore.unitLabel }}({{ configStore.unitSymbol }})</strong>
    </span>

    <button type="button" class="toggle-button" @click="configStore.toggleUnit">
      단위 변경
    </button>

    <button
      v-if="configStore.unitChangeCount > 0"
      type="button"
      class="reset-button"
      @click="configStore.resetUnit"
    >
      초기화
    </button>

    <small v-if="configStore.unitChangeCount > 0">
      {{ configStore.unitChangeCount }}회 변경
    </small>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-left: auto;
  color: #475569;
  font-size: 0.78rem;
}

button {
  padding: 6px 9px;
  font-size: 0.76rem;
  font-weight: 700;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-button {
  color: #ffffff;
  background: #475569;
}

.reset-button {
  color: #475569;
  background: #e2e8f0;
}

small {
  color: #64748b;
}
</style>
