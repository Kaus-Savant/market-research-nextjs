# 🚀 SilverX Quick Start Guide

## The Fastest Way to Get Running

### 1️⃣ Open Terminal in Project Folder
```bash
cd C:\Users\Kaustubh\OneDrive\Documents\GitHub\market-research-nextjs
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
```
http://localhost:3000
```

**That's it!** ✅ The app is now running with sample data.

---

## 📱 What You'll See

### Dashboard (Default Page)
- 6 KPI cards showing deal metrics
- Pipeline funnel chart
- Stage breakdown
- Recent activity table

### Navigation (Left Sidebar)
- 📊 Dashboard
- 🔀 Kanban Pipeline
- 📋 All Deals
- ➕ New Opportunity
- 🔍 Screening
- 🔬 Due Diligence
- ⚖️ Inv. Committee
- ✗ Rejected Deals
- ✅ Invested

### Top Actions
- ⬇ Export CSV
- + Add New Deal

---

## 🔧 First-Time Setup (If Needed)

```bash
# 1. Install dependencies (if not done yet)
npm install

# 2. Set up database (first time only)
npx prisma migrate dev --name init

# 3. Seed with sample data (optional)
npm run seed

# 4. Start the app
npm run dev
```

---

## 📝 Creating a New Deal

1. Click **+ Add New Deal** button (top right)
2. Fill in the form:
   - Company Name *
   - Founder Name(s) *
   - Sector *
   - Company Stage *
   - Geography *
   - Ask Amount *
   - Source *
   - Assigned Associate *
   - Pitch Summary *
3. Click **✅ Log Deal & Enter Pipeline**

The deal will appear in:
- Dashboard recent activity
- Kanban pipeline (New Opportunity column)
- All Deals table

---

## 🔍 Searching & Filtering

In the **All Deals** page:
- 🔍 Search by company name, sector, or founder
- Filter by pipeline stage
- Filter by sector
- Filter by alignment (High/Medium/Low)

---

## 📊 Viewing Deal Details

Click **View** button on any deal in tables to see:
- Full company information
- Screening outputs
- Pitch summary
- Due diligence report (if available)
- IC memo and decision (if available)
- Document checklist

---

## 💾 Saving & Exporting

### Export All Deals as CSV
Click **⬇ Export CSV** at any time to download:
- `silverx_deals_YYYY-MM-DD.csv`
- Contains all deal data
- Ready for Excel/Sheets

---

## 🎨 UI Features

### Color-Coded Status
- 🔵 New Opportunity (Blue)
- 🟣 Screening (Purple)
- 🟡 Due Diligence (Amber)
- 🟢 IC (Green)
- ✅ Invested (Green)
- ✗ Rejected (Gray)

### Alignment Indicators
- 🟢 High (Green) - Strong fit
- 🟡 Medium (Amber) - Partial fit
- 🔴 Low (Red) - Weak fit

---

## 🛑 If Something Breaks

### The app won't load
```bash
# Stop the server (Ctrl+C)
# Clear cache
rm -rf .next
# Restart
npm run dev
```

### Database issues
```bash
# Reset database
rm prisma/dev.db
# Re-run migrations
npx prisma migrate deploy
# Reseed (optional)
npm run seed
```

### Module not found
```bash
# Reinstall
npm install
```

---

## 📍 File Locations

| What | Where |
|------|-------|
| App Pages | `components/pages/` |
| Database | `prisma/dev.db` |
| Config | `.env`, `tsconfig.json` |
| Styles | `app/globals.css` |
| API Routes | `app/api/deals/` |

---

## 🎓 Next Steps

### To Add More Features:
1. Open `components/pages/` to see existing pages
2. Look at `lib/prisma.ts` to understand database access
3. Check `app/api/deals/route.ts` for API patterns
4. Modify `prisma/schema.prisma` to add database fields

### To Customize:
- Edit colors in `app/globals.css`
- Modify sidebar in `components/Sidebar.tsx`
- Change layouts in `components/pages/`

---

## 🌐 Local Network Access

Want to view on another device?

```bash
# From the dev server output:
http://192.168.0.125:3000

# Or find your IP:
ipconfig getifaddr en0  # macOS
ipconfig              # Windows
```

---

## 📚 Learn More

- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com/docs

---

**Ready?** Run `npm run dev` and start managing deals! 🚀
