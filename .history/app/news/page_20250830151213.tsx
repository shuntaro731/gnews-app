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

  if (res.ok) {
    throw new Error("failed to fetch");
  }

  return res.json();
}

export default function NewsPage() {
  const data = await fetchTopHeadlines();
  const articles: Article[] = data.articles ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">最新ニュース</h1>
      <ul className="space-y-6">
        {articles.map((a, i) => {
          <li
            key={i}
            className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {a.image && (
              <img
                src={a.image}
                alt=""
                className="w-full rounded-md mb-4 object-cover"
              />
            )}
          </li>;
        })}
      </ul>
    </div>
  );
}
