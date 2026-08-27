<template>
  <section class="base-dashboard-card">
    <!-- 부모가 전달한 검색 또는 날씨 목록을 이 위치에 표시합니다. -->
    <slot />
  </section>
</template>

<style scoped>
.base-dashboard-card {
  padding: 18px;
  margin-bottom: 16px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}
</style>
