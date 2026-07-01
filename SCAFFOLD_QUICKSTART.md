# 🚀 Quick Start: Scaffold a Client Site

Generate a fully standalone client website in 3 steps.

---

## Step 1: Fill in Client Data

Edit [client-intake.json](client-intake.json) with real client information:

```json
{
  "client_slug": "johndoe-dental",
  "template": "t1",
  "practice": {
    "name": "John Doe Family Dentistry",
    "phone": "(555) 123-4567",
    ...
  },
  "doctor": {
    "name": "Dr. John Doe, DDS",
    ...
  },
  "booking_link": "https://calendly.com/johndoe-dental"
}
```

**Minimum required fields:**
- `client_slug` (directory name)
- `template` ("t1", "t2", or "t3")
- `practice.name`
- `booking_link`

Leave optional fields as `null` — the script will create TODOs for missing data.

---

## Step 2: Run Scaffold Script

```bash
npm install  # Install tsx if needed
npm run scaffold
```

Or directly:

```bash
npx tsx scripts/scaffold-client.ts
```

The script will:
- ✅ Create `../{client_slug}/` directory
- ✅ Copy template files
- ✅ Replace all placeholders with client data
- ✅ Initialize git repo
- ✅ Build and verify

---

## Step 3: Deploy

```bash
cd ../{client_slug}
vercel link
vercel --prod
```

---

## What Gets Created

```
templates-opkie/           ← Template source (this repo)
johndoe-dental/           ← New standalone client site
├── app/                  ← Full Next.js app (from T1/T2/T3)
├── components/           ← React components
├── data/                 ← Client data (placeholders replaced)
├── public/images/        ← Replace placeholder images here
├── package.json          ← Independent dependencies
├── README.md             ← Client-specific docs
└── MISSING_DATA.md       ← TODO list (if fields missing)
```

---

## Template Choices

### T1 — Prestige Leader
**Best for:** High-end cosmetic practices, luxury dental offices
**Style:** Editorial luxury, dark hero videos, premium photography
**Example:** `"template": "t1"`

### T2 — Clinical Innovator
**Best for:** Tech-forward practices, implant specialists
**Style:** High-tech precision, animated metrics, architectural UI
**Example:** `"template": "t2"`

### T3 — Spatial Sanctuary
**Best for:** Holistic practices, anxiety-focused care
**Style:** Mindful minimalism, therapeutic animations, comfort-first
**Example:** `"template": "t3"`

---

## After Scaffolding

### 1. Replace Placeholder Images

```bash
cd ../{client_slug}/public/images/
```

Replace these files:
- `team/doctor-portrait.png` — Doctor headshot
- `team/staff-photo.jpg` — Team photo
- `office-exterior.jpg` — Office building
- `office-interior.jpg` — Waiting room
- `logo-placeholder.svg` — Practice logo

### 2. Add Real Testimonials

Edit `data/master.ts`:

```typescript
export const sampleReviews: ReviewData[] = [
  {
    reviewerName: "Sarah M.",
    rating: 5,
    reviewText: "Dr. Doe made my root canal painless...",
    procedureCategory: "Root Canal",
    verificationBadge: "google",
    isVerifiedPatient: true,
  },
  // Add more real reviews
];
```

### 3. Review Missing Data

Check `MISSING_DATA.md` for any incomplete fields and fill them in.

### 4. Test Locally

```bash
npm run dev
```

Visit http://localhost:3000

---

## Common Issues

### "Target directory already exists"

The client_slug directory already exists. Either:
- Delete it: `rm -rf ../{client_slug}`
- Choose a different client_slug in client-intake.json

### "Build failed"

Check for:
- Missing required fields in client-intake.json
- Invalid JSON syntax
- TypeScript errors (run `npm run build` to see details)

### "Cannot find module"

If you see import errors, check that no `@opkie` imports remain:

```bash
grep -r "@opkie" app/ components/
```

---

## Full Documentation

For detailed instructions, see [SCAFFOLD_GUIDE.md](SCAFFOLD_GUIDE.md)

---

## Support

- Check [SCAFFOLD_GUIDE.md](SCAFFOLD_GUIDE.md) for troubleshooting
- Review [client-intake.json](client-intake.json) schema
- Verify all required fields are filled in
