"use client"; // Client-side rendering

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign-In and Sign-Up
  const router = useRouter();

  const handleAuth = async () => {
    const endpoint = isSignUp ? "/api/register" : "/api/login";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Store token in localStorage after successful login
      const { token } = await response.json();
      localStorage.setItem("authToken", token);

      // Redirect to the dashboard
      router.push("/dashboard");
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-20">
        {isSignUp ? "Create an Account" : "Welcome to To-Do App"}
      </h1>
      <div className="space-y-4 flex flex-col">
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-80 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-80 rounded"
        />
        <button
          onClick={handleAuth}
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <p
          onClick={() => setIsSignUp((prev) => !prev)}
          className="text-blue-600 cursor-pointer"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}
