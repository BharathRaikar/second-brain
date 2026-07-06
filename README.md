# Second Brain

A personal dashboard — Work, Projects, Personal, Travel, Reflection, Finance — synced
across devices via Supabase, hosted free on GitHub Pages, installable as a home-screen app.

## 1. Create the Supabase project (free)

1. Go to https://supabase.com → New project (free tier is enough).
2. Once it's created, go to **Project settings → API**. Copy:
   - `Project URL`
   - `anon public` key
3. Go to the **SQL editor** and run this to create the table:

```sql
create table items (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  title text not null,
  notes text,
  status text not null default 'Backlog',
  created_at timestamp with time zone default now()
);

alter table items enable row level security;

-- Personal single-user app: allow the anon key full access.
-- Fine for private personal use since the anon key alone can't be guessed,
-- but do not put sensitive data (passwords, financial account numbers) in here.
create policy "Allow all for anon" on items
  for all
  using (true)
  with check (true);
```

## 2. Configure the app locally

```bash
npm install
cp .env.example .env
```

Edit `.env` and paste in your Supabase URL and anon key.

```bash
npm run dev
```

Opens at http://localhost:5173 — check that adding an item works and shows up in
Supabase's Table editor.

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/second-brain.git
git push -u origin main
```

If you name the repo something other than `second-brain`, update the `base` path in
`vite.config.js` to match (e.g. `base: '/my-repo-name/'`).

## 4. Add your Supabase keys as repo secrets

In your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**

Add two secrets:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

(Same values as your local `.env`. This is what lets the GitHub Actions build embed
them into the deployed app — they end up in the built JS bundle, which is normal for
a Supabase anon key, that's what row-level security is for.)

## 5. Turn on GitHub Pages

**Settings → Pages → Build and deployment → Source: GitHub Actions**

Push to `main` (or re-run the workflow from the Actions tab) and it'll build and
deploy automatically. Your app will be live at:

```
https://YOUR_USERNAME.github.io/second-brain/
```

## 6. Add it to your phone home screen

Open that URL in Chrome on your phone → menu → **Add to Home screen**. It'll launch
full-screen with its own icon, no browser chrome.

## Adding more sections later

Everything reads from one array in `src/sections.js`. To add a new section, add one
entry there — the nav, the "More" tab, and the database queries all pick it up
automatically since every item just carries a `section` field.
