# 드론평야

## 관련문서
- https://docs.google.com/spreadsheets/d/1c2CQBvLqbv_Zxnt3Pguurln66AYAX5OqOu9dkHcrpjg/edit?gid=0#gid=0

## 개발기간 (디자인 포함)
24/08/23(금) ~ 24/09/09(월)

## 개발환경
- Front: React
    - node -v v16.20.2
    - npm -v 8.19.4

## 주의사항
- http 환경에서만 적용확인
    - https는 cors에러. (드론평야 api 서버 수정 필요)
    - ~~uuid로 사용자 정보를 불러오는것까지 하려 했으나 https연결만 지원하므로 보류~~
 
## 진행상황
2024-10-03
- 액세스토큰 필요한 모든 내부API들에서 토큰만료 시 리프레쉬토큰으로 액세스토큰 재발급 및 함수 재실행 기능 적용 완료.
- 리프레시 토큰 만료시 자동 로그아웃 기능 적용 완료.


# dornefield_react
# dornefield_react
# dornefield_react
# dronefield_react
