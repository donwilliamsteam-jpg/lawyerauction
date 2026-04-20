# Quick Start - Demo Access

## 🚀 Start the Application

```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

---

## 🎯 Demo Access (No Login Required)

### Option 1: Landing Page Demo Buttons

1. Go to **http://localhost:3000**
2. Click one of the demo buttons below the main CTAs:
   - **"Demo: Admin Dashboard →"** - Access admin interface
   - **"Demo: Attorney Dashboard →"** - Access attorney view

### Option 2: Direct URL Access

Simply navigate to any route:

**Admin Dashboard:**
```
http://localhost:3000/admin
```

**Attorney Dashboard:**
```
http://localhost:3000/dashboard
```

**All Admin Routes:**
- `/admin` - Overview with KPIs
- `/admin/submissions` - Attorney submissions
- `/admin/attorneys` - Attorney management
- `/admin/leads` - Lead tracking
- `/admin/interactions` - Interaction analytics
- `/admin/billing` - Billing & payments
- `/admin/routing` - Routing rules
- `/admin/settings` - System settings

---

## 🧪 Test the Onboarding Flow

### Quick Test Data

1. **Start:** Click "Start 6-Month Plan" or "Start 12-Month Plan"

2. **Package:** Already selected (6-month or 12-month)

3. **Practice Areas:**
   - Select: Personal Injury, Family Law, Criminal Defense
   - Cost: $875/month ($500 + $250 + $125)

4. **Geography:**
   - Choose "New York" from Top 10 markets
   - Enter ZIP code: 10001

5. **Firm Profile:**
   - Firm Name: **Test Law Firm**
   - Attorney Name: **John Smith**
   - Email: **test@example.com**
   - Phone: **(555) 123-4567**
   - Website: **https://testfirm.com**
   - Address: **123 Main St, New York, NY 10001**
   - Number of Attorneys: **5**
   - Intake Contact: **intake@testfirm.com**

6. **Payment:**
   - Select: Credit Card
   - Card Number: **4242 4242 4242 4242**
   - Expiry: **12/25**
   - CVV: **123**
   - Name: **John Smith**
   - ZIP: **10001**
   - ✅ Check the agreement box

7. **Review:** Click "Complete Purchase"

8. **Confirmation:** View success page

---

## 📊 What You'll See

### Admin Dashboard Features
- 8 KPI metric cards
- Recent submissions table
- Recent interactions table
- Lead queue snapshot
- Full navigation to all admin routes

### Attorney Dashboard Features
- Account overview
- Lead statistics
- Budget tracking
- Performance metrics

### Mock Data Available
- 5+ attorney submissions
- Multiple interactions (email, call, SMS, chat)
- Lead queue with various statuses
- Real-time pricing calculations
- Complete onboarding flow data

---

## 🎨 Test Responsive Design

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Select device (iPhone, iPad, etc.)
4. Navigate through all routes

All features work on mobile with optimized layouts.

---

## ✅ Key Demo Points

**For Stakeholders:**
- Complete 8-screen onboarding flow
- Dynamic pricing ($500/$250/$125 structure)
- Professional, modern design
- Comprehensive admin dashboard
- Real-time metrics and analytics

**For Technical Review:**
- Next.js 13 with TypeScript
- Supabase database integration
- Row Level Security policies
- Responsive, mobile-first design
- Production-ready build

**For Sales Demo:**
- User-friendly experience
- Transparent pricing
- Clear value proposition
- Trust indicators throughout
- Professional presentation

---

## 📖 Full Documentation

For complete details, see:
- **DEMO_ACCESS.md** - Comprehensive demo guide
- **IMPLEMENTATION_SUMMARY.md** - Full feature documentation
- **SECURITY.md** - Security implementation details

---

## 🎉 That's It!

**No authentication required for demo.** All routes are accessible immediately.

Start exploring at: **http://localhost:3000**
