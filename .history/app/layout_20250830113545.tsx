import "./globals.css";

export const metadata = { title: "Next.js x Gnews" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: "sans-serif, system-ui", margin: 0 }}>
        <header>
          <strong>Next.js X Gnews</strong>
        </header>
        <main className="max-w-[960px] mx-4 my-auto px-0 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
