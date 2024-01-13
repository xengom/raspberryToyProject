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
* 240113 express 적용하여 내 서버에서 남이 사용 가능하도록 변경
* 240113 웹버전, 아이폰단축어 버전 분리

## How to use
1. 웹버전
  `[공유받은DDNS]/?id=[아이디]&pw=[비밀번호]&loc=[출근위치]`로 접근 시, 출근, 퇴근 버튼만 존재하는 심플한 웹 출력
2. 단축어 버전
  출근 : `[공유받은DDNS]/login/id=[아이디]&pw=[비밀번호]&loc=[출근위치]`
  퇴근 : `[공유받은DDNS]/logout/?id=[아이디]&pw=[비밀번호]&loc=[출근위치]`
  브라우저에서 자동 실행되게 단축어 설정
3. 브라우저 열기 싫다면
  본 리포지토리를 clone 받은 후, ssh를 통해 출/퇴근 명령을 수행할 수 있도록 수정하여 사용
  ex) login.js, logout.js만으로 구현 가능 
