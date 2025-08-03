# MY KBO TEAM TICKETING
### 야구 예매 사이트 바로가기 서비스



이 서비스는 홈/원정 경기 상관없이 예매 사이트를 알아서 찾아주고 리디렉션 하는 서비스입니다.

따라서 이 서비스를 사용하게 된다면, 다른 팀의 예매 사이트가 어딘지 직접 찾지 않아도 됩니다.



**서비스 바로가기 : https://myteamticketing.vercel.app**

###### last updated : 2025-08-04

----
now fixing:

fetchGameData.ts 안에 있는 months 수정해서 월 별로 경기 불러오기
(아직 수정중. 월을 선택해도 바뀌지 않고 해당 월 경기 페이지가 그대로 불러와지는 문제 발생.)

data crawling 
```
npx ts-node --project tsconfig.scripts.json scripts/fetchGameData.ts
```
