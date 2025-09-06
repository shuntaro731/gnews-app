import Image from "next/image";
import dynamic from "next/dynamic";

const NewsClient = dynamic(() => import("./NewsClient"), { ssr: !false });

type ArticleProps = {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  source?: { name: string; url: string };
};

async function fetchTopHeadlines() {
  const API_PATH = "/api/news?lang=ja&country=jp&max=10";
  const url = `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}${API_PATH}`;
  
  console.log("Fetching news from:", url);
  
  const res = await fetch(url, {
    cache: "no-store",
  });

  console.log("Response status:", res.status);
  console.log("Response ok:", res.ok);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Error Response:", errorText);
    throw new Error(`Failed to fetch news headlines. Status: ${res.status}, Response: ${errorText}`);
  }

  const data = await res.json();
  console.log("API Response data:", data);
  return data.articles ?? [];
}

export default async function NewsPage() {
  let articles: ArticleProps[] = [];
  let errorMessage: string | null = null;

  try {
    articles = await fetchTopHeadlines();
  } catch (error) {
    console.error("Error fetching news:", error);
    errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">最新ニュース</h1>
      <NewsClient />

      {errorMessage ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <h2 className="font-bold">エラーが発生しました</h2>
          <p className="text-sm">{errorMessage}</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {articles.map((a) => (
            <li
              key={a.url}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <a href={a.url} target="_blank" rel="noreferrer" className="block">
                {a.image && (
                  <img
                    src={a.image}
                    alt={a.title}
                    width={400}
                    height={200}
                    className="w-full rounded-md mb-4 object-cover"
                  />
                )}
                <h2 className="text-xl font-semibold text-blue-600 hover:underline mb-2">
                  {a.title}
                </h2>
              </a>
              <p className="mb-2 text-gray-700">{a.description}</p>
              <div className="text-sm text-gray-500">
                {a.source?.name && <span>{a.source.name}</span>}
                {a.source?.name && a.publishedAt && <span> | </span>}
                {a.publishedAt && (
                  <span>
                    {new Date(a.publishedAt).toLocaleDateString("ja-JP")}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
