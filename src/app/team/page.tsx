"use client";

import { useRouter } from "next/navigation";
import { teamMap } from "@/data/teams";
import Link from "next/link"; // ← 추가

export default function TeamPage() {
  const router = useRouter();

  return (
    <main className="p-4">
      {/* ✅ 상단 헤더 + 홈 버튼 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl KBOFontBold">팀을 선택하세요</h1>
        <Link href="/">
          <button className="text-sm text-blue-600 underline hover:text-blue-800">
            ← 홈으로
          </button>
        </Link>
      </div>

      {/* 팀 선택 버튼들 */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(teamMap).map(([slug, team]) => (
          <button
            key={slug}
            onClick={() => router.push(`/schedule/${slug}`)}
            className="p-3 rounded border bg-white hover:bg-blue-100 cursor-pointer"
          >
            {team.name}
          </button>
        ))}
      </div>
    </main>
  );
}
