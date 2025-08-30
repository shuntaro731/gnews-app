import { NextResponse } from "next/server";

const BASE_URL = "https://gnews.io/api/v4/search"; // ← freeプランは search のみ

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // freeプランでは q は必須
  const q = searchParams.get("q") || "AI";
  const lang = searchParams.get("lang") || "ja";
  const max = searchParams.get("max") || "10";

  const token = "2c4f0342e3a59d206837c16f49efa159";
  if (!token) {
    return NextResponse.json({ error: "missing API key" }, { status: 500 });
  }

  // Freeプランは q, lang, max しか使えない
  const params = new URLSearchParams({
    q,
    lang,
    max,
    token,
  });

  const url = `${BASE_URL}?${params.toString()}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
