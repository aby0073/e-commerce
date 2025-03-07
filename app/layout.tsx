// app/layout.tsx
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Product Catalog",
  description: "Browse and shop products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}