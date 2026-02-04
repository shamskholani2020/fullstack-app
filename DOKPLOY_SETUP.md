# Dokploy Deployment Configuration

## Environment Variables

This application requires the following environment variables to be set in Dokploy:

### Required Environment Variables

| Variable Name | Value | Description |
|---------------|--------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://supabase.kholani.store` | Supabase database URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Supabase public/anon key (JWT token) |
| `NEXT_PUBLIC_SUPABASE_PROJECT_REF` | `bader` | Supabase project reference |

### How to Configure in Dokploy

1. **Go to your application settings in Dokploy**
2. **Find "Environment Variables" or "Build Arguments" section**
3. **Add the following variables:**

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://supabase.kholani.store
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NzAxNTE5NzIsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.2OFTnDKqV42NvGDOtc7oieh8wR6HTQIdYJjGH_KW8wU
   NEXT_PUBLIC_SUPABASE_PROJECT_REF=bader
   ```

4. **Save the configuration**
5. **Redeploy the application**

### Build Arguments vs Runtime Environment

This Dockerfile supports both:
- **Build Arguments (ARG):** Variables available during Docker build
- **Runtime Environment (ENV):** Variables available when container runs

For this application, both are set automatically from the same values you provide.

### Troubleshooting

#### Build Fails with "supabaseKey is required"
**Cause:** Environment variables not set correctly in Dokploy
**Solution:** Verify all three environment variables are set with correct values

#### Build Fails with Other Errors
**Cause:** .env.local file issue or missing dependencies
**Solution:**
1. Check Dokploy logs: `/etc/dokploy/logs/bader-full-qh85q5/`
2. Verify environment variables are set
3. Ensure Dockerfile is using latest version (commit 96c9ccf or later)

### Verification

After successful deployment, visit:
- **Application:** https://bader.kholani.store
- **Test Database:** All pages should load and connect to Supabase

### Security Note

The `NEXT_PUBLIC_SUPABASE_ANON_KEY` is a public key meant for client-side use. It's safe to include in your deployment configuration. However, never expose your `service_role` or private keys in client code.
