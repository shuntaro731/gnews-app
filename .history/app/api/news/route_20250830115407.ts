import { NextResponse } from "next/server";

const BASE = "https://gnews.io/api/v4/top-headlines";


export async function GET(req: Request) {
  const (searchParams) = new URL (req.url)
  const q = searchParams.get("q") || ""
}