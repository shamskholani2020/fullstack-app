# Setup Configuration

**Project:** Al-Bader (البادر)  
**Environment:** Production (https://bader.kholani.store)

---

## 🔗 Supabase Configuration

**Your Supabase deployment is ready at:** https://supabase.kholani.store

### Required Information

**To connect Al-Bader app to your Supabase database, I need:**

1. **Project URL**
   - Format: `https://[project-id].supabase.co` or `https://[project-id].supabase.co/[project-ref]`
   - **Where to find:** Go to https://supabase.com/dashboard → Select your project → Settings → General → Project URL

2. **Anon/Public Key** (for client-side database access)
   - Format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Where to find:** Go to https://supabase.com/dashboard → Select your project → Settings → API → anon/public key

3. **Project Reference** (alternative to project URL)
   - Format: `[project-id]` (e.g., `abcdefgh-12345`)
   - **Where to find:** Same as Project URL above

### How to Provide

**Option A: Copy from Supabase Dashboard (Recommended)**
1. Log in to https://supabase.com/dashboard
2. Select your project: `bader` or `al-bader`
3. Go to Settings → API
4. Copy all three values:
   - Project URL
   - Anon/public key
   - Project reference

5. Send them to me here

**Option B: Environment Variables**
Once I have the values, I'll add them to:
- `.env.local` file (for local development)
- Dokploy environment variables (for production deployment)

### Environment Variables File

Create `.env.local` in project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_SUPABASE_PROJECT_REF=your_project_ref_here
```

---

## 🔗 Twilio Configuration (For SMS Verification)

### Required Information

**To enable SMS verification for phone authentication, I need:**

1. **Account SID** (starts with `AC`)
2. **Auth Token** (starts with `SK`)
3. **Twilio Phone Number** (e.g., +963 xxx xxxx xxx)

### How to Provide

**Option A: Copy from Twilio Console**
1. Log in to https://console.twilio.com
2. Go to Project → Keys & Credentials
3. Copy all three values:
   - Account SID
   - Auth Token
   - Twilio Phone Number

4. Send them to me here

### Environment Variables

Once I have the values, I'll add them to:

```bash
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
```

---

## 🔗 OpenStreetMap Configuration

OpenStreetMap is FREE and doesn't require API keys. This is already configured in the landing page.

---

## 🔗 OneSignal Configuration (For Push Notifications)

### Required Information

**To enable web push notifications, I need:**

1. **App ID** (looks like `12345678-abcdefg`)
2. **Rest API Key** (looks like `MDliYmM6QXZzN5...`)

### How to Provide

**Option A: Copy from OneSignal Dashboard**
1. Log in to https://onesignal.com/apps
2. Select your app (or create new one)
3. Go to Settings → Keys & IDs
4. Copy both values:
   - App ID
   - Rest API Key

5. Send them to me here

### Environment Variables

Once I have the values, I'll add them to:

```bash
# OneSignal Configuration
NEXT_PUBLIC_ONESIGNAL_APP_ID=your_app_id_here
NEXT_PUBLIC_ONESIGNAL_REST_API_KEY=your_rest_api_key_here
```

---

## 📋 Configuration Checklist

Please provide the following information to complete Stage 1 setup:

### Required for Stage 1 (Foundation)
- [ ] **Supabase Configuration**
  - [ ] Project URL
  - [ ] Anon/public key
  - [ ] Project reference (optional)

- [ ] **Twilio Configuration** (for SMS verification)
  - [ ] Account SID
  - [ ] Auth Token
  - [ ] Twilio Phone Number

### Optional (Can add later)
- [ ] **OneSignal Configuration** (for push notifications)
  - [ ] App ID
  - [ ] Rest API Key

---

## 🚀 What Happens After Configuration

Once you provide these values, I will:

1. **Create `.env.local` file** with all environment variables
2. **Test database connection** (verify Supabase works)
3. **Create Supabase migrations** (run the SQL schema)
4. **Set up authentication flow** (SMS verification)
5. **Configure offline support** (IndexedDB integration)
6. **Test all integrations** (maps, notifications, etc.)
7. **Commit configuration** to `stage-1-foundation` branch
8. **Push to GitHub** for review

---

## 📊 Configuration Status

| Integration | Status | Action Needed |
|------------|--------|---------------|
| **Supabase** | ⏳ Waiting | Provide URL + Anon Key |
| **Twilio** | ⏳ Waiting | Provide SID + Token + Phone |
| **OpenStreetMap** | ✅ Ready (No API needed) | None |
| **OneSignal** | ⏳ Optional | Provide App ID + API Key |

---

## 📝 Next Steps

1. **Provide Supabase credentials** (Project URL + Anon/public key)
2. **Provide Twilio credentials** (SID + Token + Phone Number)
3. **I will configure the app** (environment variables, database connection)
4. **We'll run initial migrations** (create tables, seed data)
5. **We'll test authentication flow** (SMS verification)
6. **We'll verify offline support** (IndexedDB + service worker)

---

**Waiting for your configuration!** ⏳

Please send the required Supabase and Twilio credentials when ready.

---

**Document Status:** Configuration Requested  
**Last Updated:** February 3, 2026  
**Branch:** `stage-1-foundation`

---

**End of Configuration Requirements** 📋
