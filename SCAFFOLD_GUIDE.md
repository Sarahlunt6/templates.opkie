# CLIENT SITE SCAFFOLD GUIDE

This guide explains how to generate a fully standalone client website from the T1/T2/T3 templates using real client data.

---

## Quick Start

1. **Fill in client-intake.json** with real client data
2. **Run the scaffold script**: `npx tsx scripts/scaffold-client.ts`
3. **Review the output** in `../{client_slug}/`
4. **Deploy**: `cd ../{client_slug} && vercel link && vercel deploy`

---

## What Gets Created

The scaffold script creates a **completely standalone Next.js project** in a sibling directory:

```
templates-opkie/           ← Template source (this repo)
client-name/              ← New standalone client site
├── app/                  ← Copied from chosen template
├── components/           ← Shared components
├── data/                 ← Client data (placeholders replaced)
├── public/               ← Assets
├── package.json          ← Independent dependencies
├── README.md             ← Client-specific docs
├── MISSING_DATA.md       ← TODO list (if any fields missing)
└── .git/                 ← Fresh git history
```

---

## Step-by-Step Process

### 1. Fill in `client-intake.json`

Open [client-intake.json](client-intake.json) and fill in all available fields:

```json
{
  "client_slug": "johndoe-dental",
  "template": "t1",
  "practice": {
    "name": "John Doe Family Dentistry",
    "phone": "(555) 123-4567",
    "phone_link": "tel:+15551234567",
    "address": {
      "street": "123 Main Street",
      "city": "Portland",
      "state": "OR",
      "zip": "97201"
    },
    "hours": {
      "monday": "8:00 AM - 5:00 PM",
      "tuesday": "8:00 AM - 5:00 PM",
      ...
    }
  },
  "doctor": {
    "name": "Dr. John Doe, DDS",
    "title": "General & Family Dentist",
    "years_experience": 12,
    "credentials": [
      "Doctor of Dental Surgery, OHSU",
      "American Dental Association Member",
      "Portland Dental Society"
    ],
    "bio_short": "Dr. Doe has been serving Portland families for over a decade..."
  },
  "booking_link": "https://calendly.com/johndoe-dental",
  "brand": {
    "accent_color": "#2563eb"
  },
  "membership": {
    "individual_price": 299,
    "couple_price": 549,
    "family_price": 899
  },
  "stats": {
    "google_rating": 4.9,
    "review_count": 142,
    "patients_served": 3200,
    "satisfaction_rate": 97
  },
  "vercel": {
    "project_name": "johndoe-dental",
    "domain": "johndoedental.com"
  }
}
```

**Important Rules:**
- Use `null` for optional fields you don't have yet
- Use `""` (empty string) for required text fields you'll fill in later
- Do NOT invent fake data — the script will create TODOs for missing fields

**Minimum Required Fields:**
- `client_slug` — Used for directory name (lowercase, hyphens)
- `template` — Must be "t1", "t2", or "t3"
- `practice.name` — Client's practice name
- `booking_link` — Online booking URL (or phone link)

### 2. Run the Scaffold Script

From the templates-opkie root directory:

```bash
npx tsx scripts/scaffold-client.ts
```

The script will:
1. ✅ Validate your intake data
2. 📦 Create a new standalone project at `../{client_slug}/`
3. 🔄 Replace all placeholders with real client data
4. 🎨 Apply brand colors (if provided)
5. 💬 Remove placeholder testimonials
6. 📝 Generate MISSING_DATA.md for incomplete fields
7. 🌿 Initialize a fresh git repo with initial commit
8. 🔨 Run `npm install` and `npm run build` to verify

**Expected output:**
```
🚀 OPKIE CLIENT SITE SCAFFOLD

📋 Client: John Doe Family Dentistry
📐 Template: T1
📁 Output: /path/to/johndoe-dental

📦 Creating standalone project structure...
🔄 Replacing placeholder data with client info...
🎨 Applying brand colors...
💬 Removing placeholder testimonials...
📝 Updating project metadata...
🌿 Initializing git repository...
🔨 Installing dependencies and verifying build...

✅ Build successful!

═══════════════════════════════════════════════════════════════
✨ SCAFFOLD COMPLETE!
═══════════════════════════════════════════════════════════════

📁 Project location: ../johndoe-dental

🚀 Next steps:
   1. cd johndoe-dental
   2. Review MISSING_DATA.md if present
   3. Run: vercel link
   4. Run: vercel deploy
```

### 3. Review the Output

Navigate to the new project:

```bash
cd ../johndoe-dental
```

**Check for MISSING_DATA.md:**

If any fields were missing from client-intake.json, you'll see a `MISSING_DATA.md` file listing all TODOs:

```markdown
# MISSING DATA REPORT

## Action Required

### `stats.google_rating`
**Used in:** 3 location(s)

- app/components/T1PremiumHero.tsx
  Context: Hero stat bar rating display
- app/page.tsx
  Context: Testimonials section header
```

**Search for TODOs in code:**

```bash
# Find all TODO comments
grep -r "TODO:" app/ components/ data/
```

Common TODOs:
- `// TODO: Replace with real client testimonials`
- `<!-- TODO: missing client data — stats.google_rating -->`

### 4. Add Client Assets

Replace placeholder images:

```bash
# Required images (must match these paths)
public/images/
├── team/
│   ├── doctor-portrait.png     # Doctor headshot
│   └── staff-photo.jpg          # Team photo
├── office-exterior.jpg          # Office building exterior
├── office-interior.jpg          # Waiting room / interior
└── logo-placeholder.svg         # Replace with real logo
```

### 5. Deploy to Vercel

```bash
# Link to Vercel project
vercel link

# Deploy to production
vercel --prod
```

---

## Template Comparison

### T1 — Prestige Leader
**Best for:** High-end cosmetic practices, luxury medical spas, premium dental offices

**Design:** Editorial luxury with serif typography, dark hero videos, premium photography

**Key Features:**
- Cinematic video backgrounds
- Premium typography with split-text reveals
- Editorial service presentations
- High-end aesthetic

**Stats display:** "5,000+ smile transformations. 98% patient satisfaction."

---

### T2 — Clinical Innovator
**Best for:** Tech-forward practices, implant specialists, digital dentistry clinics

**Design:** High-tech precision with telemetry counters, animated grids, architectural framing

**Key Features:**
- Interactive technology panels
- Animated precision metrics (0.1mm, 12min)
- Treatment phase dashboard
- Modern architectural UI elements

**Stats display:** "12-minute crown milling. 0.1mm 3D imaging precision."

---

### T3 — Spatial Sanctuary
**Best for:** Holistic practices, anxiety-focused care, wellness-oriented dentistry

**Design:** Mindful minimalism with therapeutic animations, soft colors, comfort-first messaging

**Key Features:**
- Sensory check-in interface
- Philosophy pillars (Listen, Plan, Care)
- Calm, unhurried aesthetic
- Patient comfort emphasis

**Stats display:** "Unhurried 90-minute appointments. Sedation options available."

---

## Placeholder Replacement Map

The script automatically replaces these placeholders:

| Placeholder | Replaced With | Field |
|------------|---------------|-------|
| Summit Dental Group | Client practice name | `practice.name` |
| Dr. Michael Roberts, DDS | Client doctor name | `doctor.name` |
| Lead Cosmetic Dentist | Doctor title | `doctor.title` |
| (801) 555-0123 | Client phone | `practice.phone` |
| Salt Lake City, UT | Client city/state | `practice.address.city` |
| 1250 Mountain View Drive | Client address | `practice.address.street` |
| https://booking.example.com | Client booking URL | `booking_link` |
| $335 / $615 / $965 | Membership prices | `membership.*_price` |
| 5.0 rating | Google rating | `stats.google_rating` |
| 5,000+ patients | Patients served | `stats.patients_served` |
| 98% satisfaction | Satisfaction rate | `stats.satisfaction_rate` |
| #0f766e (teal) | Brand accent color | `brand.accent_color` |

---

## Handling Missing Data

### Philosophy: Never Invent Data

If a field is `null` or `""` in client-intake.json, the script will:
1. Insert a TODO comment at that location
2. Add the field to MISSING_DATA.md
3. Continue building (won't crash)

### Example: Missing Google Rating

**Before scaffold:**
```tsx
<div className="stat">
  <span className="value">5.0</span>
  <span className="label">Google Rating</span>
</div>
```

**After scaffold (with missing data):**
```tsx
<!-- TODO: missing client data — stats.google_rating -->
<div className="stat">
  <span className="value">{/* TODO */}</span>
  <span className="label">Google Rating</span>
</div>
```

**MISSING_DATA.md entry:**
```markdown
### `stats.google_rating`
**Used in:** 1 location(s)
- app/page.tsx
  Context: Hero stat bar rating display
```

### Resolving TODOs

1. Fill in missing fields in client-intake.json
2. Re-run `npx tsx scripts/scaffold-client.ts` (or manually update code)
3. Remove MISSING_DATA.md once resolved

---

## Testimonials

### Placeholder Removal

The script automatically removes all placeholder testimonials and leaves a TODO:

```typescript
export const sampleReviews: ReviewData[] = [
  // TODO: Replace with real client testimonials — do not launch with placeholder reviews
  // Remove this comment and add actual verified patient reviews
];
```

### Adding Real Testimonials

Replace the TODO with actual client reviews:

```typescript
export const sampleReviews: ReviewData[] = [
  {
    id: "rev-001",
    reviewerName: "Sarah M.",
    rating: 5,
    reviewText: "Dr. Doe made my root canal completely painless...",
    procedureCategory: "Root Canal",
    verificationBadge: "google",
    datePosted: "2024-03-15",
    isVerifiedPatient: true,
  },
  // ... more reviews
];
```

**Important:** Only use real, verified patient reviews. Do not launch with placeholder testimonials.

---

## Troubleshooting

### Build Fails

If `npm run build` fails during scaffolding:

1. **Check for TypeScript errors:**
   ```bash
   npm run build 2>&1 | grep "error TS"
   ```

2. **Common issues:**
   - Missing required fields causing type errors
   - Invalid phone_link format (must start with "tel:")
   - Malformed JSON in client-intake.json

3. **Fix and rebuild:**
   ```bash
   npm run build
   ```

### Missing Assets

If images are missing:

1. Check `public/images/` for placeholder files
2. Replace with actual client photos
3. Ensure paths match exactly (case-sensitive)

### Monorepo References

The scaffold should remove all monorepo imports. If you see errors like:

```
Cannot find module '@opkie/core'
```

This means a monorepo import wasn't removed. Search and fix:

```bash
grep -r "@opkie" app/ components/ data/
```

Replace with local imports or remove the dependency.

---

## Advanced Usage

### Custom Template Modifications

If you need to modify a template before scaffolding:

1. Make changes to the source template in `templates-opkie/app/(templates)/t1/`
2. Run the scaffold script — it will copy your modified version
3. The new client site will include your changes

### Batch Scaffolding

To scaffold multiple clients:

1. Create multiple intake files: `client-intake-site1.json`, `client-intake-site2.json`
2. Modify the script to accept a parameter: `npx tsx scripts/scaffold-client.ts client-intake-site1.json`
3. Run for each client

### Post-Scaffold Customization

After scaffolding, you can freely modify the client site:

- Add custom pages
- Modify components
- Adjust styling
- Add third-party integrations

The client site is **fully independent** and doesn't affect the template source.

---

## Deployment Checklist

Before launching a client site:

- [ ] All MISSING_DATA.md items resolved
- [ ] All TODO comments removed from code
- [ ] Placeholder testimonials replaced with real reviews
- [ ] All placeholder images replaced with client photos
- [ ] Real logo added (not placeholder)
- [ ] Google Maps embed shows correct address
- [ ] Phone links work correctly
- [ ] Booking link works
- [ ] SSL certificate configured
- [ ] Custom domain connected
- [ ] Google Analytics added (if applicable)
- [ ] Site tested on mobile/tablet/desktop
- [ ] SEO meta tags verified

---

## Support

For issues with scaffolding:
1. Check this guide
2. Review error messages carefully
3. Verify client-intake.json is valid JSON
4. Ensure all required fields are filled in

For template bugs or feature requests:
- Create an issue in the templates-opkie repository
