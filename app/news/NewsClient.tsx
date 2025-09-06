"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type Article = {
  title: string;
  url: string;
  image: string;
  publishedAt: string;
  source?: { name: string; url: string };
  description?: string;
};

const TOPICS = [
  { key: "business", label: "ビジネス" },
  { key: "tecnology", label: "テクノロジー" },
  { key: "entertaiment", label: "エンタメ" },
  { key: "sports", label: "スポーツ" },
  { key: "science", label: "サイエンス" },
  { key: "health", label: "ヘルス" },
];

export default function NewsClient() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const p = new URLSearchParams({ lang: "ja", country: "jp", max: "10" });
    if (q.trim()) p.set("q", q.trim());
    if (topic) p.set("topic", topic);
    try {
      const res = await fetch(`/api/news?${p.toString()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "not fetched");
      setArticle(data.articles ?? []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, [q, topic]);

  useEffect(() => {
    load();
  }, [load]);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          load();
        }}
        className="mb-6 flex-col gap-2 sm:flex-row sm:items-center"
        aria-label="ニュース検索フォーム"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="キーワードを入力してください"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500"
          aria-label="キーワード"
        />
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          aria-label="トピック"
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500"
        >
          {TOPICS.map((t) => (
            <option key={t.key} value={t.key}>
              {t.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 active:bg-blue-800"
        >
          検索
        </button>
      </form>
      {loading && <p className="py-2 text-sm text-gray-500">ローディング中</p>}
      {error && <p className="py-2 text-sm text-red-600">{error}</p>}

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {article.map((a, i) => (
          <li
            key={a.url || String(i)}
            className="rounded-lg border border-gray-200 p-4 shadow-sm transition hover:shadow-md"
          >
            {a.image && (
              <Image
                src={a.image}
                alt=""
                width={400}
                height={200}
                className="mb-3 h-48 w-full rounded-md object-cover"
              />
            )}
            {a.title}
            <a/>
            {a.description && (
              <p className="mt-2 text-gray-500">{a.description}</p>
            )}

            <div className="mt-3 flex flex-col items-center gap-2 text-xs text-gray-500">
              {a.source?.name && <span>{a.source.name}</span>}
              {a.publishedAt && (
                <span>{new Date(a.publishedAt).toLocaleString("ja-JP")}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
