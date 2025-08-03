import Navbar from "./components/Navbar";
import "./globals.css";
import SessionWrapper from "./SessionWrapper"; // ✅ the client wrapper

export const metadata = {
  title: "Student Record System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <SessionWrapper>
          <Navbar />
          <main className="p-4">{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
