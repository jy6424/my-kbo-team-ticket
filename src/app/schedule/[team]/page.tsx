"use client";

import { useParams } from "next/navigation";
import { teamMap } from "@/data/teams";
import { useEffect, useState } from "react";

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

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">{teamInfo.name} 경기 일정</h1>
      {filteredGames.length === 0 ? (
        <p>등록된 경기가 없습니다.</p>
      ) : (
        filteredGames.map((game) => {
          // 홈팀 슬러그 찾기
          const homeTeamSlug = Object.entries(teamMap).find(
            ([_, info]) => info.name_short === game.homeTeam
          )?.[0];

          const homeTeamTicketSite = teamMap[homeTeamSlug || ""]?.ticketSite;

          return (
            <div
              key={`${game.date}-${game.time}-${game.homeTeam}-${game.awayTeam}`}
              className="border rounded p-3 mb-3 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">
                  {game.date} {game.time}
                </div>
                <div>
                  {game.homeTeam} (홈) vs {game.awayTeam}
                </div>
                <div className="text-sm text-gray-600">{game.stadium}</div>
              </div>
              <a
                href={homeTeamTicketSite || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                예매하기
              </a>
            </div>
          );
        })
      )}
    </main>
  );
}
