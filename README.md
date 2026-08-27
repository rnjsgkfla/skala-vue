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
- `src/components/weather/WeatherExercises.vue`: 단계별 실습 컴포넌트를 보여주는 영역

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
- `src/components/weather/WeatherExercises.vue`: Mockup과 Composition 실습을 순서대로 보여주는 영역

## 03. Weather Component

### 실습한 내용

- 기존 Composition 기능을 유지하면서 화면을 역할에 따라 여러 컴포넌트로 분리했습니다.
- `WeatherParent`가 날씨 데이터와 검색, 선택, 온도 필터 상태 및 계산 로직을 관리합니다.
- `BaseDashboardCard`의 `<slot>`에 검색 영역과 날씨 목록을 각각 전달해 공통 디자인을 재사용했습니다.
- `SearchBar`는 검색어를 `props`로 받고 `update-query`, `clear-query` 이벤트를 부모로 전달합니다.
- `WeatherCard`는 도시 객체를 `props`로 받고 `select-card`, `click-detail` 이벤트를 부모로 전달합니다.
- 각 컴포넌트의 디자인을 `<style scoped>`로 분리했습니다.

### 개인 커스터마이징

- Composition 단계에서 추가한 온도 필터를 `TemperatureFilter` 컴포넌트로 별도 분리했습니다.
- 부모의 `onlyHotCities`, `hotCityCount`를 `props`로 전달하고, 체크 상태 변경은 `update-only-hot` 이벤트로 부모에 전달했습니다.
- Mockup, Composition, Component 결과를 한 페이지에 순서대로 표시해 구조가 발전하는 과정을 비교할 수 있게 했습니다.

### 관련 파일

- `src/components/weather/WeatherParent.vue`: 상태와 로직을 관리하는 부모 컴포넌트
- `src/components/weather/BaseDashboardCard.vue`: 슬롯 기반 공통 레이아웃
- `src/components/weather/SearchBar.vue`: 검색어 입력 컴포넌트
- `src/components/weather/WeatherCard.vue`: 도시별 날씨 카드 컴포넌트
- `src/components/weather/TemperatureFilter.vue`: 개인 추가 온도 필터 컴포넌트
- `src/components/weather/WeatherExercises.vue`: 세 단계의 실습을 순서대로 보여주는 영역

## 04. Weather Router

### 실습한 내용

- Vue Router를 설치하고 `main.js`에서 애플리케이션에 Router 인스턴스를 주입했습니다.
- `App.vue`에 `RouterLink` 내비게이션과 현재 경로의 화면을 출력하는 `RouterView`를 배치했습니다.
- `/`, `/about`, `/weather/:cityId` 경로와 존재하지 않는 주소를 처리하는 Catch-all Route를 설정했습니다.
- `WeatherHomeView`를 `WeatherParent` 구조를 참고한 라우트 메인 화면으로 구성했습니다.
- 카드의 상세보기 이벤트에서 `router.push()`를 호출해 도시 ID가 포함된 동적 경로로 이동하도록 변경했습니다.
- `WeatherDetailView`에서 `route.params.cityId`를 읽고 마운트 시점에 해당 도시의 Mock 상세 데이터를 선택했습니다.
- 서비스 소개 View와 잘못된 주소를 안내하는 Not Found View를 작성했습니다.

### 개인 커스터마이징

- 검색어를 URL의 `?search=` Query String과 동기화해 Router 상태 변화를 확인할 수 있게 했습니다.
- 필수 페이지 외에 `/guide` 경로와 `WeatherGuideView`를 추가해 검색, 온도 필터, 상세보기 사용법을 안내했습니다.
- 이전 Mockup, Composition, Component 실습은 `WeatherExercises`에 보존하고 Router 실습과 한 페이지에서 비교할 수 있게 했습니다.
- 기본 데이터에 추가했던 제주도 상세 기상 정보도 동적 상세 페이지에서 확인할 수 있게 했습니다.

### 관련 파일

- `src/router/index.js`: 경로와 View 매핑
- `src/App.vue`: Router 내비게이션과 `RouterView`
- `src/main.js`: Router 인스턴스 주입
- `src/views/WeatherHomeView.vue`: 라우터용 날씨 메인 화면
- `src/views/WeatherDetailView.vue`: 도시별 동적 상세 화면
- `src/views/WeatherAboutView.vue`: 서비스 소개 화면
- `src/views/NotFoundView.vue`: Catch-all 안내 화면
- `src/views/WeatherGuideView.vue`: 개인 추가 이용 안내 화면
- `src/components/weather/WeatherExercises.vue`: 이전 세 단계 실습 모음

## 05. Pinia Weather Store

### 실습한 내용

- Pinia를 설치하고 `main.js`에서 Pinia 인스턴스를 애플리케이션에 주입했습니다.
- `configStore`에 온도 단위 `unit` 상태, 단위 기호를 반환하는 `unitSymbol` getter, 단위를 전환하는 `toggleUnit` action을 작성했습니다.
- `UnitToggler`를 Store 단계 Navigation Bar 오른쪽에 배치해 어느 라우트에서든 단위를 변경할 수 있게 했습니다.
- `WeatherCard`와 `WeatherDetailView`가 같은 Store 상태를 읽어 메인 카드와 상세 화면의 단위를 함께 변경하도록 했습니다.
- 원본 날씨 데이터는 섭씨로 유지하고 `computed`에서만 화씨 변환 공식 `(섭씨 × 9 / 5) + 32`를 적용했습니다.

### 개인 커스터마이징

- `unitChangeCount` state로 사용자가 단위를 변경한 횟수를 기록했습니다.
- `unitLabel` getter로 현재 단위를 `섭씨` 또는 `화씨` 한글 이름으로 표시했습니다.
- `resetUnit` action을 추가해 단위와 변경 횟수를 초기 상태로 되돌릴 수 있게 했습니다.
- 단위 변경 후에만 초기화 버튼과 변경 횟수가 나타나도록 `UnitToggler`를 확장했습니다.

### 관련 파일

- `src/stores/configStore.js`: 온도 단위 전역 상태, getters, actions
- `src/components/weather/UnitToggler.vue`: 단위 변경 및 초기화 UI
- `src/components/weather/WeatherCard.vue`: Store 단위가 적용된 날씨 카드
- `src/views/WeatherDetailView.vue`: Store 단위가 적용된 상세 화면
- `src/App.vue`: Store 단계 Navigation Bar와 `UnitToggler`
- `src/main.js`: Pinia 인스턴스 주입

## 06. Weather Axios

### 사용한 API

| 제공 서비스 | API | 활용 기능 |
| --- | --- | --- |
| OpenWeather | Current Weather API | 서울, 수원, 부산, 제주의 실제 현재 날씨 조회 |
| OpenWeather | 5 day / 3 hour Forecast API | 선택한 도시의 5일 예보 조회 |
| Open-Meteo | Air Quality API | 선택한 도시의 US AQI, PM10, PM2.5 조회 |

Open-Meteo는 OpenWeather와 별개의 외부 서비스입니다. 날씨만 제공하던 애플리케이션에 대기질 정보를 추가하기 위해 기타 외부 API로 연동했습니다.

### 실습한 내용

- Axios로 외부 API에 `GET` 요청을 보내 실제 데이터를 가져왔습니다.
- `async/await`와 `try/catch/finally`로 요청 성공, 오류, 로딩 상태를 관리했습니다.
- `Promise.all()`로 여러 도시의 현재 날씨를 병렬 요청하고, 상세보기에서는 5일 예보와 대기질을 함께 요청했습니다.
- API 키는 코드에 직접 작성하지 않고 `.env.local`의 `VITE_OPENWEATHER_API_KEY` 환경 변수로 관리했습니다.

### API 요청과 데이터 활용

OpenWeather 요청에는 도시를 지정하는 `q`, API 키인 `appid`, 섭씨 단위인 `units=metric`, 한국어 응답을 위한 `lang=kr`을 Query Parameter로 전달합니다. Postman에서도 같은 값을 `Params` 탭에 입력해 원본 JSON 응답을 확인할 수 있습니다.

응답 데이터에서는 다음 값을 추출해 사용합니다.

| JSON 경로 | 사용 내용 |
| --- | --- |
| `main.temp` | 현재 기온 |
| `main.humidity` | 습도 |
| `wind.speed` | 풍속 |
| `coord.lat`, `coord.lon` | 대기질 조회에 사용할 위도와 경도 |
| `weather[0].description` | 첫 번째 날씨 설명 |

`weather`는 배열이므로 첫 번째 날씨 정보는 `weather[0]`으로 접근합니다. 프로젝트에서는 Optional Chaining을 사용해 해당 값이 없을 때 발생할 수 있는 오류도 방지했습니다.

### 5일 예보 데이터 가공

OpenWeather Forecast API는 하루에 한 건이 아니라 3시간 간격의 예보를 `list` 배열로 반환합니다. 모든 값을 표시하지 않고 다음 과정으로 날짜별 대표 예보를 선택했습니다.

1. `dt_txt`에서 날짜와 시간을 분리합니다.
2. 각 예보 시간과 정오 12시의 차이를 계산합니다.
3. 같은 날짜 중 정오에 가장 가까운 항목 하나만 `Map`에 저장합니다.
4. 날짜별 대표 예보 중 앞의 5개를 화면에 표시합니다.

12시 데이터가 있으면 그 값이 선택되고, 없다면 9시나 15시처럼 정오에 가장 가까운 시간의 데이터가 선택됩니다.

### 개인 커스터마이징

- 외부 서비스인 Open-Meteo 대기질 API를 추가해 날씨와 함께 US AQI, PM10, PM2.5를 확인할 수 있게 했습니다.
- AQI 수치를 좋음, 보통, 민감군 주의, 나쁨, 매우 나쁨으로 구분했습니다.
- OpenWeather의 어색한 직역 표현을 자연스러운 한국어 날씨 표현으로 변환했습니다.
- 새로고침 버튼, 마지막 갱신 시각, API 오류별 안내와 다시 시도 기능을 추가했습니다.
- 기존 Pinia Store를 재사용해 현재 날씨와 5일 예보의 섭씨·화씨 단위를 함께 변경하도록 했습니다.

### 환경 변수 설정

`.env.example`을 복사해 `.env.local`을 만들고 `VITE_OPENWEATHER_API_KEY`에 발급받은 키를 입력합니다. API 키가 포함된 `.env.local`은 Git에 커밋하지 않습니다.

### 관련 파일

- `src/services/weatherApi.js`: Axios 인스턴스, API 요청, 응답 데이터 가공
- `src/components/weather/WeatherAxiosDashboard.vue`: 실시간 날씨, 예보, 대기질 UI와 요청 상태 관리
- `src/App.vue`: 여섯 번째 Axios 실습 영역
- `.env.example`: API 키 환경 변수 예시

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
