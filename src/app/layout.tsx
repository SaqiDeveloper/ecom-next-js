import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}