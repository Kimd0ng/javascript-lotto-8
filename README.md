# 로또 (JavaScript) – 구현 및 실행 가이드

## 구현 기능 목록

-   로또 발매: 1,000원당 1장, 각 장은 1~45 범위의 중복되지 않는 6개 정수
-   로또 번호 정렬 출력 (오름차순)
-   당첨 번호 6개와 보너스 번호 입력 및 검증
-   당첨 통계 계산 (3개, 4개, 5개, 5개+보너스, 6개)
-   총 수익률 계산 및 소수점 한 자리 반올림 출력 (예: 62.5%)
-   예외: 모든 입력 검증 실패 시 "[ERROR]"로 시작하는 메시지 출력 후 해당 단계부터 재입력

## 아키텍처

-   `src/Lotto.js`: 로또 도메인, 번호 유효성 검증 및 조회
-   `src/services/LottoGenerator.js`: `MissionUtils.Random` 기반 로또 번호 생성
-   `src/services/ResultCalculator.js`: 당첨 통계 및 총 당첨금 계산
-   `src/utils/validators.js`: 금액/CSV/보너스 번호 검증 유틸
-   `src/views/Printer.js`: 콘솔 출력 모듈 (`MissionUtils.Console`)
-   `src/App.js`: 전체 플로우 오케스트레이션 (입력 → 발매 → 통계 → 출력)

## 실행 방법

1. Node.js 22.19.0 이상 확인
    ```bash
    node --version
    ```
2. 패키지 설치 및 테스트/실행
    ```bash
    npm install
    npm run test
    npm run start
    ```

## 입출력 형식 (요약)

-   입력
    -   구입금액 (1,000원 단위 정수)
    -   당첨 번호 CSV (예: `1,2,3,4,5,6`)
    -   보너스 번호 (1~45, 당첨 번호와 중복 불가)
-   출력
    -   구매 수량 및 각 로또 번호 (`[1, 3, 5, 14, 22, 45]` 형식)
    -   당첨 통계 5줄과 총 수익률 (소수점 한 자리)

## 테스트

-   `__tests__/ApplicationTest.js`, `__tests__/LottoTest.js` 기준으로 동작을 검증합니다.
-   UI 입출력은 `MissionUtils.Console` 모킹을 통해 검증합니다.

## 개발 규칙 요약

-   함수 길이 ≤ 15라인, 들여쓰기 깊이 ≤ 2, else 지양
-   외부 라이브러리 사용 금지 (제공된 `@woowacourse/mission-utils`만 사용)
-   프로그램 시작점: `src/App.js`의 `run()`
