type ArticleProps = {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  source?: { name: string; url: string };
};

async function fetchTopHeadlines() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}`);
  return <div>page</div>;
}
