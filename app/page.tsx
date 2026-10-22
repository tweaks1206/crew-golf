import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Crew Golf</h1>
      <p className="text-gray-600">
        Set up matches with your crew, score the round, and see who owes whom.
      </p>
      {user ? (
        <p>Signed in as {user.email}</p>
      ) : (
        <Link
          href="/login"
          className="rounded-lg bg-green-700 px-4 py-3 text-center font-semibold text-white"
        >
          Sign in
        </Link>
      )}
    </main>
  );
}
