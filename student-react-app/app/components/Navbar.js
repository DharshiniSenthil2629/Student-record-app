"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import "./Navbar.css"; // Assuming you have a CSS file for Navbar styles

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-black text-white p-4 flex gap-6">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/add">Add Student</Link>
      <Link href="/view">View Students</Link>

      {session ? (
        <button
          onClick={() => signOut()}
          className="ml-auto bg-white text-black px-3 py-1 rounded"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/api/auth/signin"
          className="ml-auto bg-green-600 text-white px-3 py-1 rounded"
        >
          Login with GitHub
        </Link>
      )}
    </nav>
  );
}
