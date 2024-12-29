"use client"; // This ensures it runs on the client-side

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove token from localStorage (or cookies, depending on your choice)
    localStorage.removeItem("authToken");

    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
    >
      Sign Out
    </button>
  );
}
