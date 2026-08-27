<template>
  <main class="weather-home">
    <p class="eyebrow">SKALA Vue Hands on</p>
    <h1>Weather Application</h1>
    <p class="description">
      PDF의 Weather Hands on을 Mockup부터 차례대로 구현합니다.
    </p>

    <section class="next-step">
      <span>다음 단계</span>
      <strong>01. Weather Mockup</strong>
    </section>
  </main>
</template>

<style scoped>
.weather-home {
  width: min(720px, calc(100% - 40px));
  margin: 0 auto;
  padding: 18vh 0 80px;
}

.eyebrow {
  margin: 0 0 12px;
  color: #2563eb;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #172033;
  font-size: clamp(2.8rem, 9vw, 5.8rem);
  letter-spacing: -0.06em;
  line-height: 1;
}

.description {
  margin: 24px 0 0;
  color: #64748b;
  line-height: 1.7;
}

.next-step {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-top: 56px;
  padding: 22px 0;
  border-top: 1px solid #cbd5e1;
  border-bottom: 1px solid #cbd5e1;
}

.next-step span {
  color: #64748b;
}

.next-step strong {
  color: #172033;
}
</style>

