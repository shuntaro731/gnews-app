import { NextResponse } from "next/server";

const BASE = "https://gnews.io/api/v4/top-headlines";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const topic = searchParams.get("topic") || "";
  const lang = searchParams.get("lang") || "ja";
  const country = searchParams.get("country") || "jp";
  const max = searchParams.get("max") || "10";

  console.log("API Request params:", { q, topic, lang, country, max });

  const token = process.env.GNEWS_API_KEY;
  if (!token) {
    console.error("GNEWS_API_KEY is missing from environment variables");
    return NextResponse.json({ error: "missing api key" }, { status: 500 });
  }

  const params = new URLSearchParams({
    lang,
    country,
    topic,
    max,
    token,
  });

  if (q) params.set("q", q);
  if (topic) params.set("topic", topic);

  const url = `${BASE}?${params.toString()}`;
  console.log("Fetching from GNews API:", url.replace(token, "***"));

  try {
    const res = await fetch(url, { cache: "no-store" });

    console.log("GNews API Response status:", res.status);
    console.log("GNews API Response ok:", res.ok);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("GNews API Error Response:", errorText);
      return NextResponse.json(
        { error: `Upstream error: ${res.status} - ${errorText}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    console.log("GNews API Response data keys:", Object.keys(data));
    console.log("Articles count:", data.articles?.length || 0);
    
    return NextResponse.json(data, { status: 200 });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.error("API Route Error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
