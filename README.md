# Avanti Equipment Finance

Professional equipment financing brokerage website with dealer and customer portals.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Features

- **Public Website**: Homepage, About, Contact, Apply pages
- **Credit Application**: Full online credit application form (saves to Supabase)
- **Dealer Portal**: Protected dashboard for dealer partners to track deals
- **Customer Portal**: Protected dashboard for customers to view applications
- **Authentication**: Supabase Auth with role-based routing (dealer vs customer)
- **Responsive**: Fully responsive design across all devices

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/avanti-equipment-finance.git
cd avanti-equipment-finance
npm install
```

### 2. Supabase Setup

Create the following tables in your Supabase project:

**applications**
```sql
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  business_name TEXT,
  dba TEXT,
  business_address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  phone TEXT,
  email TEXT,
  federal_tax_id TEXT,
  years_in_business TEXT,
  entity_type TEXT,
  owner_name TEXT,
  owner_title TEXT,
  owner_ssn TEXT,
  owner_dob TEXT,
  owner_address TEXT,
  owner_phone TEXT,
  owner_email TEXT,
  ownership_pct TEXT,
  equipment_description TEXT,
  equipment_cost TEXT,
  vendor_name TEXT,
  amount_requested TEXT,
  term_requested TEXT,
  additional_info TEXT,
  status TEXT DEFAULT 'pending',
  monthly_payment TEXT
);
```

**contact_messages**
```sql
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT
);
```

**deals** (for dealer portal)
```sql
CREATE TABLE deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  dealer_id UUID REFERENCES auth.users(id),
  business_name TEXT,
  equipment_description TEXT,
  amount_requested TEXT,
  status TEXT DEFAULT 'pending'
);
```

### 3. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Deploy

## Project Structure

```
├── app/
│   ├── (auth)/login/     # Login page
│   ├── about/            # About page
│   ├── api/contact/      # Contact API route
│   ├── apply/            # Credit application form
│   ├── contact/          # Contact page
│   ├── customers/        # Customer portal (protected)
│   ├── dealers/          # Dealer portal (protected)
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   ├── CTA.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Process.tsx
│   └── Services.tsx
├── lib/
│   ├── supabase.ts       # Supabase browser client
│   └── supabase-server.ts # Supabase server client
└── middleware.ts          # Auth middleware for protected routes
```

## Brand Colors

- **Primary Black**: `#0d1117`
- **Steel Blue**: `#4d748c`
- **Steel Blue Light**: `#6a9ab8`
- **Steel Blue Dark**: `#3a5a6e`
