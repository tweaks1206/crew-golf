# Crew Golf

Golf side games and payouts for your crew. See `CLAUDE.md` for the product
plan.

## Develop

```bash
npm install
cp .env.example .env.local   # then fill in the two Supabase values
npm run dev                  # http://localhost:3000
npm test                     # engine unit tests
```

## One-time setup (Charles)

### 1. Create the Supabase project

1. Go to https://supabase.com and sign in (GitHub sign-in is fine).
2. Click **New project**. Name it `crew-golf`, choose a strong database
   password (save it in your password manager), pick the region closest to
   you, and click **Create new project**.
3. When it finishes, open **Project Settings → API**. Copy the **Project URL**
   and the **anon public** key. You'll paste these into Vercel in step 2.
4. Open **SQL Editor → New query**, paste the whole contents of
   `supabase/migrations/0001_profiles.sql` from this repo, and click **Run**.
   This creates the `profiles` table.
5. Open **Authentication → Sign In / Providers** and make sure **Email** is
   enabled. (Magic links are on by default.)

### 2. Deploy to Vercel

1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New… → Project**, find `crew-golf`, and click **Import**.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = the Project URL from step 1.3
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the anon public key from step 1.3
4. Click **Deploy**. When it finishes, copy your site URL (something like
   `https://crew-golf.vercel.app`).

### 3. Point sign-in links at your site

1. Back in Supabase, open **Authentication → URL Configuration**.
2. Set **Site URL** to your Vercel URL from step 2.4.
3. Under **Redirect URLs**, add `https://YOUR-SITE.vercel.app/auth/callback`
   and `http://localhost:3000/auth/callback`.
4. Visit your site, tap **Sign in**, and enter your email. The link in the
   email should land you back on the home page, signed in.

## Layout

- `app/` Next.js pages and routes
- `lib/engine/` pure TypeScript game engine (no DB or UI imports)
- `lib/supabase/` Supabase clients for browser, server and middleware
- `supabase/migrations/` SQL to run in Supabase
- `docs/` rules fixtures and other planning notes
