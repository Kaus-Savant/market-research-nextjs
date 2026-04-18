# 📋 SilverX Commands Reference

## Getting Started

### Install & Run
```bash
# Navigate to project
cd market-research-nextjs

# Install all dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:3000
```

---

## Development Commands

### Start Dev Server
```bash
npm run dev
```
- Hot reload enabled
- Runs on http://localhost:3000
- Press `q` to stop

### Build for Production
```bash
npm run build
```
- Creates optimized production build
- Outputs to `.next/` folder
- Run `npm run start` to test

### Start Production Server
```bash
npm run start
```
- Runs the production build
- For local testing before deployment

---

## Database Commands

### Initialize Database
```bash
# First time setup
npx prisma migrate dev --name init

# Creates SQLite database (prisma/dev.db)
# Runs migrations automatically
# Generates Prisma client
```

### View Database in UI
```bash
npx prisma studio
```
- Opens http://localhost:5555
- Visual database manager
- Add/edit/delete records
- Great for debugging

### Seed Database
```bash
npm run seed
```
- Populates with 6 sample deals
- Useful for testing
- Can run multiple times (creates duplicates)

### Reset Database
```bash
# Delete database file
rm prisma/dev.db

# Re-run migrations
npx prisma migrate deploy

# (Optional) Reseed
npm run seed
```

### Create Migration
```bash
npx prisma migrate dev --name migration_name
```
- Use after editing `prisma/schema.prisma`
- Creates migration file
- Applies to database
- Make it first, then seed

### Generate Prisma Client
```bash
npx prisma generate
```
- Run if TypeScript errors about @prisma/client
- Usually automatic, but sometimes needed

---

## TypeScript & Build

### Check TypeScript
```bash
npx tsc --noEmit
```
- Checks for type errors
- Doesn't generate output
- Good for catching issues early

### Lint Code
```bash
npm run lint
```
- Checks code style (if configured)
- Some projects don't have linting enabled

---

## Cleanup & Maintenance

### Clear Next.js Cache
```bash
rm -rf .next
```
- Fixes build issues sometimes
- Cache can get corrupted
- Run `npm run build` after

### Clear Node Modules
```bash
rm -rf node_modules
npm install
```
- Nuclear option for dependency issues
- Takes time to reinstall
- Only do if necessary

### Clean Everything
```bash
# Windows PowerShell
rm -r node_modules, .next, prisma/dev.db -ErrorAction SilentlyContinue
npm install
npx prisma migrate dev
npm run dev
```

---

## Environment Setup

### Check Node Version
```bash
node --version
# Should be 18 or higher
```

### View Environment Variables
```bash
# Show current .env
type .env              # Windows
cat .env               # macOS/Linux
```

### Set Environment Variables
```bash
# Edit .env file
# Change DATABASE_URL if needed
# Default: file:./dev.db
```

---

## Useful Debugging

### Check Running Ports
```bash
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000
```

### Kill Port 3000
```bash
# Windows PowerShell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force

# macOS/Linux
kill -9 $(lsof -t -i:3000)
```

### View Build Time
```bash
npm run build
# Shows "Compiled successfully" with timing
```

---

## Deployment Preparation

### Pre-Deployment Checklist
```bash
# 1. Install fresh
rm -rf node_modules
npm install

# 2. Check for errors
npm run build

# 3. Test build locally
npm run start

# 4. Check database
npx prisma studio

# 5. Verify .env is set
cat .env
```

### Export for Deployment
```bash
# Create deployment files
npm run build

# Test it works
npm run start

# Ready to deploy!
# Push to git, deploy to Vercel, etc.
```

---

## Common Issues & Solutions

### "Module not found" Error
```bash
npm install
npx prisma generate
npm run build
```

### "Prisma client not initialized"
```bash
rm -rf node_modules/.prisma
npm install
npx prisma generate
```

### Port 3000 Already in Use
```bash
# Find what's using it
netstat -ano | findstr :3000

# Kill it or use different port
npm run dev -- -p 3001
```

### Database Locked
```bash
# Stop the dev server (Ctrl+C)
# Wait 5 seconds
# Run again
npm run dev
```

### Build Fails with TypeScript Errors
```bash
# Check errors
npm run build

# Fix individual errors
# Or add @ts-ignore temporarily

# Re-run build
npm run build
```

---

## Development Workflow

### Typical Day
```bash
# Morning - Start fresh
npm run dev

# During day
# - Edit files
# - Browser auto-reloads
# - Check console for errors

# Add database field
# 1. Edit prisma/schema.prisma
# 2. npx prisma migrate dev --name field_name
# 3. Update React components

# End of day
# - Ctrl+C to stop dev server
# - Commit changes to git
```

### Before Committing
```bash
# 1. Test the app
npm run build

# 2. Check for errors
npm run build 2>&1 | grep -i error

# 3. Commit if clean
git add .
git commit -m "your message"
```

---

## Git Commands (Useful)

### Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### View Status
```bash
git status
```

### Commit Changes
```bash
git add .
git commit -m "Description of changes"
```

### View Commit History
```bash
git log --oneline
```

---

## Performance Tips

### Speed Up Dev Server
```bash
# Disable turbopack
next dev --turbopack=false

# Or use Next.js SWC
npm run dev
```

### Optimize Build
```bash
# Analyze bundle
npm run build

# Check build output
ls -lh .next/static
```

---

## Emergency Commands

### Kill Dev Server & Clean
```bash
# Stop server (Ctrl+C)
rm -rf .next node_modules/.prisma
npm run dev
```

### Full Reset
```bash
# WARNING: This deletes local database
rm -rf .next node_modules/.prisma prisma/dev.db
npm install
npx prisma migrate dev
npm run dev
```

### Panic - Start Fresh
```bash
# Start completely over
rm -rf .next node_modules node_modules/.prisma prisma/dev.db package-lock.json
npm install
npm run build
npm run seed
npm run dev
```

---

## Useful Aliases (Optional)

Add to your shell profile:
```bash
alias sr='npm run'
alias sd='npm run dev'
alias sb='npm run build'
alias ss='npm run start'
alias sp='npx prisma studio'
```

Then use:
```bash
sd          # npm run dev
sp          # Opens Prisma Studio
sb          # Build
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Start App | `npm run dev` |
| Build App | `npm run build` |
| View DB | `npx prisma studio` |
| Reset DB | `rm prisma/dev.db` |
| Seed DB | `npm run seed` |
| Migrate DB | `npx prisma migrate dev` |
| Stop Server | `Ctrl+C` |
| Clear Cache | `rm -rf .next` |
| Install | `npm install` |
| Type Check | `npx tsc --noEmit` |

---

**Need Help?** Check the error message or look at `README.md` for more details.
