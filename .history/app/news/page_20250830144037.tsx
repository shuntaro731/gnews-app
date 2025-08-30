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
  return <div>page</div>;
}
