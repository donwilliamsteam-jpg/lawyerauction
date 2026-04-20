# Demo Access Guide

## Quick Access URLs

### 🎯 Main Routes

1. **Landing Page (Public)**
   - URL: `http://localhost:3000/`
   - Start the onboarding flow from here

2. **Admin Dashboard (Direct Access)**
   - URL: `http://localhost:3000/admin`
   - View platform metrics and management tools
   - **No authentication required for demo**

3. **Attorney Dashboard (Direct Access)**
   - URL: `http://localhost:3000/dashboard`
   - View attorney perspective
   - **No authentication required for demo**

4. **Onboarding Flow (Public)**
   - URL: `http://localhost:3000/onboarding`
   - Complete attorney onboarding process

---

## 🔐 Demo Access Methods

### Option 1: Direct URL Access (Easiest)

Simply navigate to any route directly:

```bash
# Admin Dashboard
http://localhost:3000/admin

# Admin Routes
http://localhost:3000/admin/submissions
http://localhost:3000/admin/attorneys
http://localhost:3000/admin/leads
http://localhost:3000/admin/interactions
http://localhost:3000/admin/billing
http://localhost:3000/admin/routing
http://localhost:3000/admin/settings

# Attorney Dashboard
http://localhost:3000/dashboard
```

### Option 2: Demo Links from Landing Page

I'll add demo access buttons to the landing page header:
- "Demo Admin Dashboard" button
- "Demo Attorney Dashboard" button

### Option 3: Complete Test Onboarding

Follow the full onboarding flow with test data:

**Step 1: Package Selection**
- Choose either 6-Month ($6,000) or 12-Month ($10,000)

**Step 2: Practice Areas**
- Select 1-3 practice areas
- Example: Personal Injury, Family Law, Criminal Defense

**Step 3: Geography**
- Option A: Select "New York" from Top 10, enter ZIP: 10001
- Option B: Select "Other" → Add city: "Buffalo, NY"

**Step 4: Firm Profile**
- Firm Name: Test Law Firm
- Attorney Name: John Smith
- Email: test@example.com
- Phone: (555) 123-4567
- Website: https://testfirm.com
- Address: 123 Main St, New York, NY 10001
- Number of Attorneys: 5
- Intake Contact: intake@testfirm.com

**Step 5: Payment**
- Select Credit Card
- Use test card: 4242 4242 4242 4242
- Expiry: 12/25
- CVV: 123
- Check the agreement box

**Step 6: Review & Submit**
- Review all information
- Click "Complete Purchase"

**Step 7: Confirmation**
- View confirmation page
- Access admin/attorney dashboards

---

## 📊 Admin Dashboard Features

### Overview Dashboard (`/admin`)
- 8 KPI cards with real-time metrics
- Recent submissions table
- Recent interactions table
- Lead queue snapshot

### Submissions Management (`/admin/submissions`)
- View all attorney submissions
- Filter by status
- Search functionality
- Export capabilities

### Attorney Management (`/admin/attorneys`)
- Attorney profiles
- Performance metrics
- Account status
- Communication tools

### Leads Management (`/admin/leads`)
- Lead distribution tracking
- Assignment rules
- Status pipeline
- Performance metrics

### Interactions Tracking (`/admin/interactions`)
- Interaction types breakdown
- Volume trends
- Cost analysis
- Revenue metrics

### Billing & Payments (`/admin/billing`)
- Payment history
- Subscription management
- Invoice generation
- Revenue reporting

### Routing Rules (`/admin/routing`)
- Lead routing configuration
- Priority settings
- Distribution algorithms
- Performance optimization

### Settings (`/admin/settings`)
- System configuration
- User preferences
- Integration settings
- Notification preferences

---

## 💼 Attorney Dashboard Features

### Dashboard (`/dashboard`)
- Account overview
- Lead statistics
- Budget tracking
- Recent activity
- Performance metrics

---

## 🧪 Test Scenarios

### Scenario 1: Quick Admin Review
1. Go to `http://localhost:3000/admin`
2. View KPI metrics
3. Check recent submissions
4. Navigate to submissions page
5. View detailed submission data

### Scenario 2: Complete Onboarding
1. Start at `http://localhost:3000/`
2. Click "Get Started"
3. Complete all 8 steps with test data
4. View confirmation page
5. Access dashboard from confirmation

### Scenario 3: Admin Management
1. Go to `http://localhost:3000/admin/attorneys`
2. View attorney list
3. Navigate to billing section
4. Review payment history
5. Check routing rules

### Scenario 4: Multi-Route Testing
1. Admin overview
2. Submissions tracking
3. Lead management
4. Interaction analytics
5. Billing review

---

## 🎨 Demo Data Available

### Mock Submissions
- 5+ attorney submissions
- Various statuses (new, contacted, accepted)
- Different package types
- Multiple practice areas

### Mock Interactions
- Email, call, SMS, live chat types
- Various practice areas
- Cost tracking
- Timestamp data

### Mock Leads
- Lead queue with different statuses
- Bid amounts
- Eligible attorney counts
- Geographic data

### Mock KPIs
- New Submissions: 23
- Active Attorneys: 47
- Monthly Ad Commitments: $42,500
- Lead Budget Available: $127,000
- Interactions Today: 156
- Leads Awaiting Routing: 8
- Interaction Revenue: $3,240
- Auction Lead Revenue: $8,750

---

## 🚀 Starting the Application

### Development Mode
```bash
npm run dev
```

Application will be available at: `http://localhost:3000`

### Build & Preview
```bash
npm run build
npm run start
```

---

## 🔧 Customizing Demo Access

### Adding Authentication (Future)

To add authentication in the future:

1. **Supabase Auth Setup**
```typescript
// In admin route
import { supabase } from '@/lib/supabase';

export default async function AdminDashboard() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Rest of component
}
```

2. **Create Login Page**
- Add `/app/login/page.tsx`
- Implement Supabase auth
- Redirect after successful login

3. **Add Role-Based Access**
- Store user roles in database
- Check permissions on route access
- Show/hide features based on role

### Demo User Accounts (Future)

```sql
-- Create demo users
INSERT INTO auth.users (email, encrypted_password)
VALUES
  ('admin@vikk.ai', crypt('demo123', gen_salt('bf'))),
  ('attorney@demo.com', crypt('demo123', gen_salt('bf')));

-- Assign roles
INSERT INTO user_roles (user_id, role)
VALUES
  ((SELECT id FROM auth.users WHERE email = 'admin@vikk.ai'), 'admin'),
  ((SELECT id FROM auth.users WHERE email = 'attorney@demo.com'), 'attorney');
```

---

## 📱 Mobile Demo

The application is fully responsive. Test on mobile:

1. Open browser dev tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (iPhone, Galaxy, etc.)
4. Navigate through routes

All features work on mobile:
- Responsive navigation
- Touch-friendly controls
- Optimized layouts
- Mobile-first design

---

## 🎯 Key Demo Points to Highlight

### For Business Stakeholders
1. Clean, professional interface
2. Complete onboarding flow (8 screens)
3. Dynamic pricing calculations
4. Comprehensive admin dashboard
5. Real-time metrics and KPIs

### For Technical Stakeholders
1. Next.js 13 with App Router
2. TypeScript throughout
3. Supabase integration
4. Row Level Security policies
5. Production-ready build
6. Responsive design
7. Component architecture

### For Sales/Marketing
1. User-friendly onboarding
2. Clear value proposition
3. Transparent pricing
4. Professional design
5. Trust indicators
6. Mobile-optimized

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Database Connection Issues
```bash
# Check .env file exists
cat .env

# Verify Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 📞 Support

For demo questions or issues:
- Check `IMPLEMENTATION_SUMMARY.md` for detailed documentation
- Review `SECURITY.md` for security features
- See component files in `/components` for implementation details

---

## ✨ Quick Start Checklist

- [ ] Start development server: `npm run dev`
- [ ] Open browser to: `http://localhost:3000`
- [ ] Navigate to Admin Dashboard: `http://localhost:3000/admin`
- [ ] Test Attorney Dashboard: `http://localhost:3000/dashboard`
- [ ] Try Onboarding Flow: Click "Get Started" from home
- [ ] Explore Admin Routes: Submissions, Attorneys, Leads, etc.
- [ ] Test Mobile View: Use browser dev tools
- [ ] Review Mock Data: Check tables and metrics

**Everything is accessible without authentication for demo purposes!**
