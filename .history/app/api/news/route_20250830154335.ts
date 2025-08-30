import { NextResponse } from "next/server";

const BASE_URL = "https://gnews.io/api/v4/top-headlines";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const topic = searchParams.get("topic") || "";
  const lang = searchParams.get("lang") || "ja";
  const country = searchParams.get("country") || "jp";
  const max = searchParams.get("max") || "10";

  const token = process.env.GNEWS_API_KEY;
  if (!token) {
    return NextResponse.json({ error: "missing API key" }, { status: 500 });
  }

  const params = new URLSearchParams({
    token,
    lang,
    // country,
    max,
  });

  if (q) {
    params.set("q", q);
  }
  // if (topic) {
  //   params.set("topic", topic);
  // }

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
