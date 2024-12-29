// /app/layout.tsx (Correct structure)
import { ReactNode } from "react";
import LogoutButton from "../components/LogoutButton";
import "./globals.css"; // Your global styles

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
      </head>
      <body>
        <header className="flex justify-between p-4 bg-gray-800 text-white">
          <h1 className="text-2xl">To-Do App</h1>
          <LogoutButton />
        </header>

        {/* Main content */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
