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
        <header
          style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}
        >
          <strong>Next.js X Gnews</strong>
        </header>
        <main
          style={{
            maxWidth: "960px",
            marginInline: "calc(0.25rem * 4)", // mx-4
            marginTop: "auto", // my-auto
            marginBottom: "auto",
            paddingInline: "0", // px-0
            paddingBlock: "calc(0.25rem * 12)", // py-12
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
