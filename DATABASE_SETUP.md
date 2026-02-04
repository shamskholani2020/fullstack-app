# Database Setup Instructions for Al-Bader

Since direct database access from this environment is blocked by network security, you'll need to run the SQL migration manually.

## Method 1: Use psql Command Line (Recommended)

### Step 1: Install psql (if not already installed)
```bash
# On Ubuntu/Debian
sudo apt-get update
sudo apt-get install postgresql-client

# On macOS
brew install postgresql

# On Windows
# Download from: https://www.postgresql.org/download/windows/
```

### Step 2: Run the SQL migration
```bash
# Connect and run SQL in one command
PGPASSWORD=jmgweg9lrkcerpfme02rtjbiapqxaauz psql -h supabase.kholani.store -U supabase -d postgres -f supabase/migrations/001_initial_schema.sql
```

### Step 3: Verify tables were created
```bash
PGPASSWORD=jmgweg9lrkcerpfme02rtjbiapqxaauz psql -h supabase.kholani.store -U supabase -d postgres -c "\dt"
```

You should see 11 tables listed.

---

## Method 2: Use Supabase Studio (Web Interface)

### Step 1: Login to Supabase Admin Panel
1. Go to: **https://supabase.kholani.store**
2. Login with:
   - Username: **supabase**
   - Password: **jmgweg9lrkcerpfme02rtjbiapqxaauz**

### Step 2: Find SQL Editor
1. Look for "SQL Editor" in the sidebar or top menu
2. Click on it to open a new SQL query window

### Step 3: Copy and Run SQL
1. Open the file: `supabase/migrations/001_initial_schema.sql`
2. Copy all the SQL content
3. Paste it into the SQL Editor
4. Click "Run" or "Execute" button

### Step 4: Verify Tables
1. Go to "Table Editor" or "Database" section
2. You should see these tables:
   - users
   - products
   - jobs
   - job_items
   - suppliers
   - exchange_rates
   - measurements
   - cut_lists
   - templates
   - checklists
   - invoices

---

## What Gets Created?

### Tables (11 main tables):
1. **users** - User authentication and profiles
2. **products** - Materials library (MDF, wood, glue, accessories)
3. **jobs** - Project management
4. **job_items** - Materials linked to jobs
5. **suppliers** - Supplier database
6. **exchange_rates** - USD/SYP conversion rates
7. **measurements** - Saved measurements
8. **cut_lists** - Optimized cutting lists
9. **templates** - Saved job templates
10. **checklists** - Pre-built checklists
11. **invoices** - Invoice and payment tracking

### Indexes (17 performance indexes):
- Optimized for common queries (search by category, status, user, etc.)

### Triggers (3 automatic triggers):
- Auto-update `updated_at` timestamp on record changes

### Functions (2 helper functions):
- `get_user_job_count()` - Get user's job count
- `get_user_unpaid_total()` - Get user's unpaid invoices total

### Seed Data (1 row):
- Official Syrian exchange rate (1 USD = 10,000 Old SYP = 100 New SYP)

---

## After Tables Are Created

Once the SQL runs successfully, let me know and I will:

1. ✅ Update the frontend to connect to Supabase
2. ✅ Enable real authentication (Twilio SMS integration)
3. ✅ Sync localStorage data to Supabase
4. ✅ Add real photo uploads
5. ✅ Set up Prisma ORM for type-safe database access

---

## Troubleshooting

### "Connection Refused" or "Timeout"
- Check if Supabase is running on your server
- Verify port 5432 is accessible from your machine
- Try connecting from the same server where Supabase is hosted

### "Permission Denied"
- Verify username and password are correct
- Check if the user has CREATE TABLE privileges

### "Table Already Exists"
- If some tables already exist, the script might fail
- Drop existing tables first: `DROP TABLE IF EXISTS invoices, checklists, templates, cut_lists, measurements, exchange_rates, suppliers, job_items, jobs, products, users CASCADE;`
- Then run the migration again

---

## Quick Test (After Setup)

```bash
# Test connection
PGPASSWORD=jmgweg9lrkcerpfme02rtjbiapqxaauz psql -h supabase.kholani.store -U supabase -d postgres -c "SELECT version();"

# Check tables
PGPASSWORD=jmgweg9lrkcerpfme02rtjbiapqxaauz psql -h supabase.kholani.store -U supabase -d postgres -c "\dt"

# Check seed data
PGPASSWORD=jmgweg9lrkcerpfme02rtjbiapqxaauz psql -h supabase.kholani.store -U supabase -d postgres -c "SELECT * FROM exchange_rates;"
```

---

**Let me know once you've created the tables!** 🚀
