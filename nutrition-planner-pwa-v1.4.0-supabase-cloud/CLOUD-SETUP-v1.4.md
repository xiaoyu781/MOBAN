# Nutrition Planner v1.4 - Supabase Cloud Setup

## 1. Run the migration
Open Supabase -> SQL Editor and run `SUPABASE-MIGRATION-v1.4.sql` once.

This adds `public.user_app_state`, which stores the existing app state losslessly as JSONB and is protected by RLS (Row Level Security / 行级安全).

## 2. Vercel environment variables
Production should contain:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Do **not** put the Supabase Secret Key in browser code.

## 3. Deploy this ZIP to the existing Vercel project
Deploy the ZIP contents at the project root. The `/api/config.js` Vercel Function reads the two public environment variables and returns only the public project URL + publishable key to the browser.

## 4. First login on an existing device
If the old version has local data, the app asks whether to import it into the signed-in account or start with an empty account. This prevents silently assigning one person's old local data to another account.

## 5. Storage model
- `profiles` remains the account profile table created earlier.
- `user_app_state` is used by v1.4 for lossless cloud sync of the current app structure (`profile`, `fridge`, `logs`).
- The other normalized tables can still be used later when individual records need analytics/reporting.
