"use client";

import { useParams } from "next/navigation";
import { teamMap } from "@/data/teams";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function normalizeDate(dateWithDay: string): string {
  return dateWithDay.split(" ")[0]; // "2025-08-01 (금)" → "2025-08-01"
}

function isPastDate(dateStr: string): boolean {
  const today = new Date();
  const gameDate = new Date(dateStr);
  return gameDate < new Date(today.setHours(0, 0, 0, 0));
}

export default function TeamSchedulePage() {
  const params = useParams();
  const slug = params.team as string;
  const teamInfo = teamMap[slug];

  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/gameSchedule.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("경기 데이터를 불러오지 못했습니다:", err);
        setLoading(false);
      });
  }, []);

  if (!teamInfo) return <p className="p-4">유효하지 않은 팀입니다.</p>;
  if (loading) return <p className="p-4">경기 데이터를 불러오는 중...</p>;

  const filteredGames = games.filter(
    (game) =>
      game.homeTeam === teamInfo.name_short ||
      game.awayTeam === teamInfo.name_short
  );

  const events = filteredGames.map((game) => {
    const date = normalizeDate(game.date);
    const homeTeamSlug = Object.entries(teamMap).find(
      ([_, info]) => info.name_short === game.homeTeam
    )?.[0];
    const ticketLink = teamMap[homeTeamSlug || ""]?.ticketSite || "#";

    return {
      title: `${game.homeTeam} (홈) vs ${game.awayTeam}`,
      date,
      extendedProps: {
        time: game.time,
        stadium: game.stadium,
        ticketLink,
      },
    };
  });

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">{teamInfo.name} 경기 일정</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClassNames={() => ["!bg-transparent", "!border-0"]}
        eventContent={(arg) => {
          const { time, ticketLink } = arg.event.extendedProps;
          const isPast = isPastDate(arg.event.startStr); // ISO 형식 비교

          return (
            <div className="text-sm leading-snug p-1">
              <div className="text-black">{arg.event.title}</div>
              <div className="text-xs text-gray-600">{time}</div>
              {isPast ? (
                <button
                  disabled
                  className="bg-gray-300 text-gray-500 px-2 py-1 rounded text-xs cursor-not-allowed"
                >
                  예매 종료
                </button>
              ) : (
                <a
                  href={ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                >
                  예매하기
                </a>
              )}
            </div>
          );
        }}
        height="auto"
      />
    </main>
  );
}
