# SKALA Vue Weather Hands-on

Vue.js 강의 자료의 Weather Hands-on 예제를 순서대로 구현하고, 각 단계에서 조금씩 기능을 발전시키는 프로젝트입니다.

## 진행 방식

- `skala-vue-main`의 완성 코드를 한 번에 복사하지 않습니다.
- PDF에 나온 실습 순서에 맞춰 한 단계씩 구현합니다.
- 각 단계에서는 해당 단원에서 배운 Vue 문법을 활용한 작은 기능만 추가합니다.
- 실습 내용과 개인 커스터마이징은 README와 Git 커밋으로 기록합니다.

## 01. Weather Mockup

### 실습한 내용

- `ref`로 날씨 목록, 검색어, 선택 결과를 반응형 상태로 만들었습니다.
- `v-for`와 `:key`를 사용해 도시별 날씨 카드를 반복 출력했습니다.
- `v-if`와 `v-else`로 25도를 기준으로 더움과 선선함을 구분했습니다.
- `:value`와 `@input`을 사용해 한글 검색어를 화면에 표시했습니다.
- 카드에는 `@click`, 상세보기 버튼에는 `@click.stop`을 사용해 두 클릭 이벤트를 구분했습니다.

### 개인 커스터마이징

- 기존 서울, 수원, 부산 데이터에 제주 날씨 데이터를 추가했습니다.
- 검색어가 입력됐을 때만 `v-if`로 초기화 버튼이 나타나도록 했습니다.
- 초기화 버튼을 누르면 검색어를 비우고 처리 결과를 상태 표시줄에 안내하도록 했습니다.

### 관련 파일

- `src/components/weather/WeatherMockup.vue`: Weather Mockup 실습 코드
- `src/views/WeatherHomeView.vue`: 실습 컴포넌트를 보여주는 페이지

## 프로젝트 실행

```sh
npm install
npm run dev
```

## 코드 검사

```sh
npm run lint
npm run build
```
