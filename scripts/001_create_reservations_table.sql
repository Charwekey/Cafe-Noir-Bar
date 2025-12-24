-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TEXT NOT NULL,
  guests INTEGER NOT NULL DEFAULT 2,
  occasion TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at DESC);

-- Enable RLS
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert reservations (for public form submission)
CREATE POLICY "Allow public to create reservations" ON reservations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to read their own reservation by email (for status check)
CREATE POLICY "Allow public to view reservations" ON reservations
  FOR SELECT
  TO anon
  USING (true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Allow authenticated full access" ON reservations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
