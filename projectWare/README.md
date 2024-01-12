# 자동 출퇴근 기록스크립트
## Using
* node.js
* javaScript
* puppeteer

## Features
* 자동 로그인
* 자동 출근위치 기록
* 자동 로그아웃

## Revision
* 240111 위치기록기능 추가
* 240111 계정정보, 출근위치 등 Parameter화
* 240113 휴일 정보 추가 (https://github.com/croquiscom/korean-business-day.git)
* 240113 모듈 분리 

## How to use
서버에 올려서 ssh를 통해 `node "[login|logout]" "ID" "PW" "출근위치"` 로 실행