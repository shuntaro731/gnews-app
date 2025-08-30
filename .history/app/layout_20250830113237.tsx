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
        {children}
      </body>
    </html>
  );
}
