import puppeteer from "puppeteer";
import { load } from "cheerio";
import fs from "fs";
import path from "path";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log("📡 페이지 접속 중...");
  await page.goto("https://www.koreabaseball.com/Schedule/Schedule.aspx", {
    waitUntil: "networkidle0",
  });

  const months = ["08"]; // 원하는 월 지정
  const games: any[] = [];

  for (const month of months) {
    console.log(`📅 ${month}월 일정 요청 중...`);

    // 월 선택
    await page.select("#ddlMonth", month);

    // form submit
    await page.evaluate(() => {
      const form = document.querySelector("form") as HTMLFormElement;
      if (form) form.submit();
    });

    // 페이지 로딩 대기
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    const content = await page.content();
    const $ = load(content);
    let currentDate = "";

    $("#tblScheduleList tbody tr").each((_, tr) => {
      const tds = $(tr).find("td");

      // 날짜 정보가 있는 경우
      if ($(tds[0]).hasClass("day")) {
        const rawDate = $(tds[0]).text().trim(); // 예: "07.01(화)"
        const match = rawDate.match(/(\d{2})\.(\d{2})\((.)\)/); // 요일까지 포함
        if (match) {
          const year = "2025";
          const dateMonth = match[1]; // 여기 이름 바꿈 (중복 방지)
          const dateDay = match[2];
          const dateWeek = match[3];
          currentDate = `${year}-${dateMonth}-${dateDay} (${dateWeek})`;
        }
      }

      const offset = $(tds[0]).hasClass("day") ? 1 : 0;
      const time = $(tds[offset + 0])
        .text()
        .trim();
      const teamInfo = $(tds[offset + 1]);
      const awayTeam = teamInfo.find("span").first().text().trim();
      const homeTeam = teamInfo.find("span").last().text().trim();
      const stadium = $(tds[offset + 6])
        .text()
        .trim();

      if (!currentDate) return;

      games.push({
        date: currentDate,
        time,
        homeTeam,
        awayTeam,
        stadium,
      });
    });

    console.log(`✅ ${month}월 누적 경기 수: ${games.length}`);
  }

  await browser.close();

  // 중복 제거
  const seen = new Set();
  const uniqueGames = games.filter((game) => {
    const key = `${game.date}-${game.time}-${game.homeTeam}-${game.awayTeam}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // 결과 저장
  const outputPath = path.join("public/data", "gameSchedule.json");
  fs.writeFileSync(outputPath, JSON.stringify(uniqueGames, null, 2), "utf-8");

  console.log(
    `✅ 총 ${uniqueGames.length}개의 고유 경기를 저장했습니다 → ${outputPath}`
  );
})();
