#!/bin/sh
set -e

# Print environment for debugging (remove in production if needed)
echo "Starting البدر (Al-Bader) application..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Check if required environment variables are set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "Warning: NEXT_PUBLIC_SUPABASE_URL not set"
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "Warning: NEXT_PUBLIC_SUPABASE_ANON_KEY not set"
fi

# Start the application
exec node server.js
