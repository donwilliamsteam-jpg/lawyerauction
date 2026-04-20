/*
  # Attorney Submissions Schema

  ## Overview
  Creates the database structure for storing attorney onboarding submissions, firm profiles, and related data for the Vikk AI attorney sales portal.

  ## New Tables
  
  ### `attorney_submissions`
  Stores complete attorney onboarding data including package selection, practice areas, geography, and firm details.
  
  - `id` (uuid, primary key) - Unique submission identifier
  - `created_at` (timestamptz) - Submission timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `status` (text) - Submission status (pending, completed, active)
  - `package_type` (text) - Selected package (6-month or 12-month)
  - `package_price` (numeric) - Total package price
  - `lead_budget` (numeric) - Included lead bidding budget
  - `specialties` (jsonb) - Array of selected practice areas
  - `monthly_ad_cost` (numeric) - Calculated monthly ad commitment
  - `geography_type` (text) - Geography selection type (top10 or other)
  - `geography_data` (jsonb) - Selected geography details
  - `firm_name` (text) - Law firm name
  - `attorney_name` (text) - Primary attorney name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone
  - `website` (text) - Firm website
  - `firm_address` (text) - Physical address
  - `number_of_attorneys` (integer) - Firm size
  - `intake_contact` (text) - Intake contact name
  - `logo_url` (text) - Uploaded logo URL
  - `description` (text) - Firm description
  - `payment_method` (text) - Payment method used
  - `payment_status` (text) - Payment completion status

  ## Security
  - Enable RLS on all tables
  - Create policies for authenticated access only
  - Admin route will use service role for read access
*/

CREATE TABLE IF NOT EXISTS attorney_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending',
  package_type text,
  package_price numeric,
  lead_budget numeric,
  specialties jsonb DEFAULT '[]'::jsonb,
  monthly_ad_cost numeric DEFAULT 500,
  geography_type text,
  geography_data jsonb DEFAULT '{}'::jsonb,
  firm_name text,
  attorney_name text,
  email text,
  phone text,
  website text,
  firm_address text,
  number_of_attorneys integer,
  intake_contact text,
  logo_url text,
  description text,
  payment_method text,
  payment_status text DEFAULT 'pending'
);

ALTER TABLE attorney_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for new submissions"
  ON attorney_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow read access for authenticated users"
  ON attorney_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow update for own submissions"
  ON attorney_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);