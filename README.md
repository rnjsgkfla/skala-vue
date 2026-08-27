# SKALA Vue Weather Hands-on

Vue.js 강의 자료의 Weather Hands-on 예제를 순서대로 구현하고, 각 단계에서 조금씩 기능을 발전시키는 프로젝트입니다.

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
- `src/views/WeatherHomeView.vue`: 단계별 실습 컴포넌트를 보여주는 페이지

## 02. Weather Composition

### 실습한 내용

- `computed`로 검색어가 포함된 도시만 반환하는 `filteredWeatherList`를 만들었습니다.
- 검색어가 비어 있으면 전체 도시를 표시하고, 일치하는 도시가 없으면 안내 문구를 표시했습니다.
- `watch`로 선택 결과의 이전 값과 새로운 값을 감시해 콘솔에 기록했습니다.
- `watchEffect`로 검색어와 검색 결과 개수를 자동 추적해 콘솔에 기록했습니다.
- Mockup의 `weatherList`, `searchQuery`, `selectedCityInfo` 상태와 기존 이벤트 기능을 그대로 이어서 사용했습니다.

### 개인 커스터마이징

- `onlyHotCities` 반응형 상태를 추가해 25도 이상인 도시만 볼 수 있도록 했습니다.
- 검색과 온도 조건을 하나의 `computed`에서 함께 계산하도록 확장했습니다.
- 개인 `computed`인 `hotCityCount`로 25도 이상인 도시 개수를 계산해 필터 옆에 표시했습니다.
- 온도 필터의 활성화 상태를 `watch`하고, 변경 결과를 상태 표시줄에 안내했습니다.
- 현재 조건에 맞는 도시 개수를 목록 제목 옆에 표시했습니다.

### 관련 파일

- `src/components/weather/WeatherComposition.vue`: Composition API를 적용한 날씨 실습 코드
- `src/views/WeatherHomeView.vue`: Mockup과 Composition 실습을 순서대로 보여주는 페이지

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
