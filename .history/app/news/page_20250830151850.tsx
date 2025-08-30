type ArticleProps = {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  source?: { name: string; url: string };
};

async function fetchTopHeadlines() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL ?? ""
    }/api/news?lang=ja&country=jp&max=10`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("failed to fetch");
  }

  return res.json();
}

import Image from "next/image";

export default async function NewsPage() {
  const data = await fetchTopHeadlines();
  const articles: ArticleProps[] = data.articles ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">最新ニュース</h1>
      <ul className="space-y-6">
        {articles.map((a, i) => (
          <li
            key={i}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {a.image && (
              <Image
                src={a.image}
                alt={a.title}
                width={800}
                height={450}
                className="w-full rounded-md mb-4 object-cover"
                style={{ objectFit: "cover" }}
              />
            )}
            <a className="text-lg font-semibold text-blue-600 hover:underline">
              {a.title}
            </a>
            <p className="mb-2">{a.description}</p>
            <a
              href={a.url}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              記事を読む
            </a>
            <div className="text-xs text-gray-500 mt-2">
              {a.source?.name && (
                <span>
                  出典:{" "}
                  <a
                    href={a.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {a.source.name}
                  </a>
                </span>
              )}
              <span className="ml-2">
                {new Date(a.publishedAt).toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
