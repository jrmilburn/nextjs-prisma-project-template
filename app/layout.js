import "./globals.css";
import AuthProvider from "@/components/session-provider";

export const metadata = { title: "My Next Starter" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
