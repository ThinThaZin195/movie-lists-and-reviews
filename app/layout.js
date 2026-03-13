import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Movies",
  description: "Discover and explore movies with reviews and ratings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-1 flex">
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
            <Sidebar />
          </aside>
          <main className="flex-1 min-w-0 overflow-x-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>
        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-500">
              <p className="text-sm">&copy; 2024 Next Movies. Built with Next.js and TMDB API.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
