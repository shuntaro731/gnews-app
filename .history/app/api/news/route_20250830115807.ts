import { NextResponse } from "next/server";

const BASE = "https://gnews.io/api/v4/top-headlines";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  const topic = url.searchParams.get("topic") || "";
  const lang = url.searchParams.get("lang") || "ja";
  const country = url.searchParams.get("country") || "jp";
  const max = url.searchParams.get("max") || "max";
}
