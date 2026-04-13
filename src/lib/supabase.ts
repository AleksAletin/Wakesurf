import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const isSupabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

/**
 * Supabase Setup Instructions:
 *
 * 1. Go to https://supabase.com and create a new project
 * 2. Copy the Project URL and anon/public key
 * 3. Create .env.local in project root:
 *    NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
 *
 * 4. Run this SQL in the Supabase SQL Editor:
 */

export const SETUP_SQL = `
-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  telegram TEXT,
  email TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  guests INT DEFAULT 1,
  total_price INT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  with_instructor BOOLEAN DEFAULT false,
  boat_id TEXT,
  gazebo_id TEXT,
  notes TEXT,
  source_site TEXT DEFAULT 'pandawake' CHECK (source_site IN ('pandawake', 'parusnik')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expenses table (for finance tracking)
CREATE TABLE IF NOT EXISTS expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  amount INT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_boat ON bookings(boat_id, date);
CREATE INDEX IF NOT EXISTS idx_bookings_gazebo ON bookings(gazebo_id, date);
CREATE INDEX IF NOT EXISTS idx_bookings_source ON bookings(source_site);
CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients(phone);

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (restrict later with auth)
CREATE POLICY "Allow all on clients" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on bookings" ON bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on expenses" ON expenses FOR ALL USING (true) WITH CHECK (true);
`;
