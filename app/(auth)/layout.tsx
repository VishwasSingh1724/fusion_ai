import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fusion Ai",
  description: "A multiple ai supported website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-full flex items-center justify-center" >
        {children}
      </body>
    </html>
  );
}