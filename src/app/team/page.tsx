"use client";

import { useRouter } from "next/navigation";
import { teamMap } from "@/data/teams";

export default function TeamPage() {
  const router = useRouter();

  return (
    <main className="p-4">
      <h1 className="text-2xl KBOFontBold mb-4">팀을 선택하세요</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(teamMap).map(([slug, team]) => (
          <button
            key={slug}
            onClick={() => router.push(`/schedule/${slug}`)}
            className="p-3 rounded border bg-white hover:bg-blue-100"
          >
            {team.name}
          </button>
        ))}
      </div>
    </main>
  );
}
