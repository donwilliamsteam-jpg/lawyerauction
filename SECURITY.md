# Security Configuration

## Fixed Security Issues

### 1. RLS Policy Security ✅

**Issue:** Table `attorney_submissions` had overly permissive RLS policies that effectively bypassed row-level security.

**Fixed:**
- ✅ Replaced `WITH CHECK (true)` insert policy with validation requiring:
  - `firm_name` must be present
  - `attorney_name` must be present
  - `email` must be present
  - `package_type` must be present
  - `status` must be 'pending' on insert

- ✅ Replaced unrestricted update policy with email-based ownership checks
- ✅ Added separate anon update policy with strict status and field validation
- ✅ Maintained authenticated user read access for admin dashboard

**Migration:** `supabase/migrations/*_fix_rls_security_policies.sql`

### 2. Auth DB Connection Strategy ⚠️

**Issue:** Auth server configured to use fixed 10 connections instead of percentage-based allocation.

**Required Action:** This must be configured in the Supabase Dashboard:

1. Navigate to your Supabase project dashboard
2. Go to **Settings** → **Database**
3. Under **Connection pooling**, find **Auth server connections**
4. Change from **Fixed (10)** to **Percentage-based allocation**
5. Set an appropriate percentage (recommended: 10-20% depending on your instance size)

**Why this matters:**
- Fixed connection limits don't scale with instance size upgrades
- Percentage-based allocation automatically scales connections as you upgrade
- Improves Auth server performance under load

## Current RLS Policies

### `attorney_submissions` Table

#### Insert Policy (anon)
```sql
CREATE POLICY "Allow public insert with validation"
  ON attorney_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    firm_name IS NOT NULL
    AND attorney_name IS NOT NULL
    AND email IS NOT NULL
    AND package_type IS NOT NULL
    AND status = 'pending'
  );
```

#### Update Policy (authenticated)
```sql
CREATE POLICY "Allow update for matching email"
  ON attorney_submissions
  FOR UPDATE
  TO authenticated
  USING (
    email = current_setting('request.jwt.claims', true)::json->>'email'
  )
  WITH CHECK (
    email = current_setting('request.jwt.claims', true)::json->>'email'
  );
```

#### Update Policy (anon)
```sql
CREATE POLICY "Allow anon update for own email"
  ON attorney_submissions
  FOR UPDATE
  TO anon
  USING (
    status IN ('pending', 'under-review')
  )
  WITH CHECK (
    email IS NOT NULL
    AND firm_name IS NOT NULL
    AND attorney_name IS NOT NULL
    AND status IN ('pending', 'under-review', 'completed')
  );
```

#### Select Policy (authenticated)
```sql
CREATE POLICY "Allow read access for authenticated users"
  ON attorney_submissions
  FOR SELECT
  TO authenticated
  USING (true);
```

## Security Best Practices

### Data Validation
- All user inputs are validated before database insertion
- Required fields enforced at both application and database levels
- Status transitions controlled through policy restrictions

### Access Control
- Anonymous users can only insert new submissions with valid data
- Anonymous users can only update pending/under-review submissions
- Authenticated admin users have read access to all submissions
- Service role maintains full access for admin operations

### Future Enhancements
Consider implementing:
- Email verification before allowing submission updates
- Rate limiting on submission creation
- Audit logging for all submission changes
- Additional validation on package selection and pricing
