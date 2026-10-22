"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const { error } = await createClient().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Sign in to Crew Golf</h1>
      {status === "sent" ? (
        <p>Check {email} for a sign-in link.</p>
      ) : (
        <form onSubmit={sendLink} className="flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-lg border border-gray-300 px-4 py-3 text-base"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-lg bg-green-700 px-4 py-3 font-semibold text-white disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Email me a link"}
          </button>
          {status === "error" && (
            <p className="text-sm text-red-600">
              Couldn&apos;t send the link. Try again.
            </p>
          )}
        </form>
      )}
    </main>
  );
}
