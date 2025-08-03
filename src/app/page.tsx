import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl KBOFontBold mb-4">
        2025 프로야구 예매 도우미 🎟️
      </h1>
      <p className="mb-4">
        응원팀을 선택하고 원정 경기 예매처를 한눈에 확인해보세요!
      </p>
      <Link href="/team">
        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          응원팀 선택하러 가기
        </button>
      </Link>
    </main>
  );
}
