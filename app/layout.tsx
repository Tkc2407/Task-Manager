"use client"
import { ReactNode } from "react";
import { usePathname } from "next/navigation"; // Hook to get the current pathname
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import './globals.css';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // Get the current route
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
      </head>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>To-Do App</title>
      </head>
      <body>
        {/* Header with logo and logout */}
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <h1 className="text-2xl">To-Do App</h1>
          <LogoutButton />
        </header>

        {/* Conditionally show buttons below the header */}
        {(pathname === "/dashboard" || pathname === "/task-list") && (
          <nav className="flex justify-center gap-8 p-4 bg-gray-200">
            <Link href="/dashboard">
              <button
                className={`py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${
                  pathname === "/dashboard"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
              >
                Dashboard
              </button>
            </Link>
            <Link href="/task-list">
              <button
                className={`py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${
                  pathname === "/task-list"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
              >
                Task List
              </button>
            </Link>
          </nav>
        )}

        {/* Main content rendered here */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
