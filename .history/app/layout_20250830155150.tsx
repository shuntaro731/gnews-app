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
          style={{
            padding: "12px 16px",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(32px)",
            position: "sticky",
            top: 0,
          }}
        >
          <strong>Next.js X Gnews</strong>
        </header>
        <main
          style={{
            maxWidth: "960px",
            margin: "16px auto",
            padding: "0 12px",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
