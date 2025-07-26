export const teamMap: Record<
  string,
  { name: string; name_short: string; ticketSite: string }
> = {
  kia: {
    name: "KIA 타이거즈",
    name_short: "KIA",
    ticketSite: "https://www.ticketlink.co.kr/sports/137/58",
  },
  lg: {
    name: "LG 트윈스",
    name_short: "LG",
    ticketSite: "https://www.ticketlink.co.kr/sports/137/59",
  },
  lotte: {
    name: "롯데 자이언츠",
    name_short: "롯데",
    ticketSite: "https://ticket.giantsclub.com/loginForm.do",
  },
  ssg: {
    name: "SSG 랜더스",
    name_short: "SSG",
    ticketSite: "https://www.ticketlink.co.kr/sports/137/476",
  },
  hanhwa: {
    name: "한화 이글스",
    name_short: "한화",
    ticketSite: "https://www.ticketlink.co.kr/sports/137/63",
  },
  nc: {
    name: "NC 다이노스",
    name_short: "NC",
    ticketSite: "https://ticket.ncdinos.com/login",
  },
  heroes: {
    name: "키움 히어로즈",
    name_short: "키움",
    ticketSite:
      "https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07001&TeamCode=PB003",
  },
  samsung: {
    name: "삼성 라이온즈",
    name_short: "삼성",
    ticketSite: "https://www.ticketlink.co.kr/sports/137/57",
  },
  doosan: {
    name: "두산 베어스",
    name_short: "두산",
    ticketSite:
      "https://ticket.interpark.com/Contents/Sports/GoodsInfo?SportsCode=07001&TeamCode=PB004",
  },
  kt: {
    name: "KT 위즈",
    name_short: "KT",
    ticketSite: "https://www.ticketlink.co.kr/sports/137/62",
  },
  // ... 나머지 팀도 동일하게 slug + name으로 구성
};
