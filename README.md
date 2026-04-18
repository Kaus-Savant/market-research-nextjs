# SilverX — Deal Flow Management

A modern Next.js application for investment pipeline and deal flow management, converted from the original HTML prototype.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up the database:**
```bash
# Create SQLite database and run migrations
npx prisma migrate dev --name init

# (Optional) Seed the database with sample data
npm run seed
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:3000
```

## 📋 Available Scripts

```bash
# Development server (hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database with sample data
npm run seed

# Open Prisma Studio (database UI)
npx prisma studio
```

## 📁 Project Structure

```
market-research-nextjs/
├── app/
│   ├── api/
│   │   └── deals/          # API routes for deal operations
│   ├── contexts/
│   │   └── DealContext.tsx # Global state management
│   ├── pages/              # Page components
│   ├── layout.tsx          # Root layout with DealProvider
│   ├── page.tsx            # Main app page
│   └── globals.css         # Global styles
├── components/
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── Topbar.tsx          # Header with actions
│   ├── Toast.tsx           # Notification component
│   └── pages/              # Page-specific components
├── lib/
│   └── prisma.ts           # Prisma client initialization
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── public/                 # Static assets
└── seed.ts                 # Database seeding script
```

## 🎯 Features

### Dashboard
- KPI metrics (Total Sourced, Screened, In Diligence, In IC, Invested, Rejected)
- Pipeline funnel visualization
- Stage breakdown chart
- Recent activity table

### Pipeline Management
- **Kanban View** - Drag-free 5-stage pipeline board
- **All Deals** - Comprehensive deal table with search & filters
- **New Opportunity** - Add new deals to pipeline

### Workflow Stages
- **Screening** - 3-step screening wizard (AI Screen, Founder Call, Team Call/PIN)
- **Due Diligence** - DDR (Due Diligence Report) tracking
- **Investment Committee** - IC decision and memo tracking
- **Rejected Deals** - Track all rejections with reasons
- **Invested Portfolio** - View all invested companies

### Additional Features
- CSV export of all deals
- Real-time badge counts
- Color-coded status and alignment indicators
- Toast notifications
- Responsive design with Tailwind CSS

## 🗄️ Database Schema

The app uses SQLite with Prisma ORM. Key fields include:

- **Basic Info:** company, founder, sector, stage, geography, ask amount, source
- **Pipeline:** status, alignment score
- **Screening:** AI fit, call insights, conviction level, PIN decision
- **Due Diligence:** market analysis, business model, traction, founder assessment, risks
- **IC:** memo, decision (Term Sheet/Deferred/Rejected)
- **Rejection Tracking:** reason, notes, rejection stage

See `prisma/schema.prisma` for full schema.

## 🔄 Data Flow

1. **Client Request** → App page or API route
2. **Context** → `DealContext` manages global deal state
3. **API Routes** → `/api/deals` and `/api/deals/[id]`
4. **Prisma** → Executes database queries on SQLite
5. **Response** → JSON data or rendered component

## 🎨 Styling

The app uses **Tailwind CSS v4** for styling. Global styles are in:
- `app/globals.css` - Reset, animations, theme variables
- Component classes use Tailwind utility classes

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
vercel deploy
```

The app is optimized for serverless deployment with Next.js.

## 🔧 Troubleshooting

### Database Issues
```bash
# Reset database
rm prisma/dev.db
npx prisma migrate deploy

# View database in UI
npx prisma studio
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Missing Dependencies
```bash
npm install
npx prisma generate
```

## 📝 Environment Variables

Create a `.env` file (already created):
```
DATABASE_URL="file:./dev.db"
```

## 🤝 Contributing

To add new features:

1. Add database schema in `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Create API routes in `app/api/`
4. Build React components in `components/`
5. Test with `npm run dev`

## 📧 Support

For issues or questions about the original HTML design, refer to `SilverX_DealFlow_Original.html` (if available).

---

**Built with:**
- ▲ Next.js 16
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🗄️ SQLite + Prisma
- ⚛️ React 19

**Last Updated:** April 2026
