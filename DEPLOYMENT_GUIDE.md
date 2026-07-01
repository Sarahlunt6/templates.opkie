# Complete Deployment Guide - Client Site Scaffold System

This guide covers the complete process of duplicating a template, customizing it with client data, creating a new GitHub repository, and deploying to Vercel.

## Overview

The scaffold system creates **fully standalone** client websites from T1, T2, or T3 templates. Each scaffolded site is:
- ✅ Independent project with its own dependencies
- ✅ Ready for its own GitHub repository
- ✅ Deployable to Vercel in minutes
- ✅ Customized with client branding and data

---

## Step 1: Prepare Client Data

### 1.1 Copy the Example File

```bash
cd ~/Documents/GitHub/templates.opkie
cp client-intake.EXAMPLE.json client-intake.json
```

### 1.2 Fill in Client Information

Edit `client-intake.json` with your client's real information:

```json
{
  "client_slug": "smithfamilydental",        // ← Becomes folder name
  "template": "t1",                           // ← Choose: t1, t2, or t3

  "practice": {
    "name": "Smith Family Dental",
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
      // ... fill in all days
    }
  },

  "doctor": {
    "name": "Dr. John Smith, DDS",
    "title": "General & Family Dentist",
    "credentials": [
      "Doctor of Dental Surgery, OHSU",
      "American Dental Association Member"
    ],
    "bio_short": "Short bio about the doctor..."
  },

  "booking_link": "https://calendly.com/smithfamilydental",

  "brand": {
    "accent_color": "#2563eb",                // ← Brand color (hex)
    "logo_path": "/images/logo-smith.svg"
  },

  "membership": {
    "individual_price": 299,
    "couple_price": 549,
    "family_price": 899
  },

  "vercel": {
    "project_name": "smithfamilydental",      // ← Vercel project name
    "domain": "smithfamilydental.com"         // ← Custom domain (optional)
  }
}
```

### 1.3 Template Selection Guide

**T1 - Prestige Leader** (Premium Editorial)
- Best for: High-end cosmetic practices, luxury dental offices
- Style: Editorial luxury, dark hero, premium photography
- Brand color example: Blue (#2563eb)

**T2 - Clinical Innovator** (High-Tech Precision)
- Best for: Tech-forward practices, implant specialists
- Style: High-tech precision, animated metrics, architectural UI
- Brand color example: Cyan (#06b6d4)

**T3 - Spatial Sanctuary** (Therapeutic Minimal)
- Best for: Holistic practices, anxiety-focused care
- Style: Mindful minimalism, therapeutic animations, comfort-first
- Brand color example: Green (#10b981)

---

## Step 2: Run the Scaffold Script

### 2.1 Execute Scaffold

```bash
npm run scaffold
```

The script will:
1. ✅ Create `../smithfamilydental/` directory
2. ✅ Copy template files and shared components
3. ✅ Generate customized `data/master.ts`
4. ✅ Replace all placeholders with client data
5. ✅ Apply brand colors
6. ✅ Initialize git repository
7. ✅ Run build verification

### 2.2 Verify Output

```
✨ SCAFFOLD COMPLETE!
📁 Project location: /Users/you/Documents/GitHub/smithfamilydental

🚀 Next steps:
   1. cd smithfamilydental
   2. Review MISSING_DATA.md if present
   3. Run: vercel link
   4. Run: vercel deploy
```

### 2.3 Check for Missing Data

```bash
cd ../smithfamilydental
cat MISSING_DATA.md  # If this file exists, fill in missing fields
```

---

## Step 3: Replace Placeholder Images

### 3.1 Navigate to Images Directory

```bash
cd public/images/
```

### 3.2 Replace These Files

**Required:**
- `team/doctor-portrait.png` - Doctor headshot (800x1000px recommended)
- `team/staff-photo.jpg` - Team photo (1920x1080px recommended)
- `office-exterior.jpg` - Office building (1920x1080px)
- `office-interior.jpg` - Waiting room/interior (1920x1080px)

**Optional:**
- `logo-[client].svg` - Practice logo (match the path in client-intake.json)
- `cases/smile-before.png` - Before photo for case studies
- `cases/smile-after.png` - After photo for case studies

### 3.3 Image Guidelines

- Use high-quality professional photos
- Maintain aspect ratios
- Optimize for web (use tools like TinyPNG)
- Ensure you have rights/consent for all patient photos

---

## Step 4: Add Real Testimonials

### 4.1 Edit master.ts

```bash
cd ../../data/
nano master.ts  # or use your preferred editor
```

### 4.2 Replace Placeholder Reviews

Find the `sampleReviews` array and replace the placeholders:

```typescript
export const sampleReviews: ReviewData[] = [
  {
    id: "rev-001",
    reviewerName: "Sarah M.",
    rating: 5,
    reviewText: "Dr. Smith and his team are amazing! They made me feel comfortable during my root canal and the results are perfect.",
    procedureCategory: "Root Canal",
    verificationBadge: "google",
    datePosted: "2024-11-15",
    isVerifiedPatient: true,
  },
  // Add 2-5 more real reviews
];
```

---

## Step 5: Test Locally

### 5.1 Run Development Server

```bash
cd ~/Documents/GitHub/smithfamilydental
npm run dev
```

### 5.2 Check in Browser

Visit http://localhost:3000 and verify:
- ✅ Practice name appears correctly
- ✅ Phone number works
- ✅ Booking link works
- ✅ Brand color is applied
- ✅ All sections display properly
- ✅ Images load (even if placeholders)
- ✅ No console errors

### 5.3 Run Production Build

```bash
npm run build
npm run start
```

Visit http://localhost:3000 again to test the production build.

---

## Step 6: Create GitHub Repository

### 6.1 Initialize Git (Already Done by Scaffold)

The scaffold script already initialized git and made the first commit. Verify:

```bash
git log
# Should show: "Initial scaffold from T1 template for Smith Family Dental"
```

### 6.2 Create GitHub Repository

**Option A: Using GitHub CLI**
```bash
gh repo create smithfamilydental --public --source=. --remote=origin
git push -u origin main
```

**Option B: Using GitHub Website**
1. Go to https://github.com/new
2. Repository name: `smithfamilydental`
3. Description: "Website for Smith Family Dental"
4. Public or Private: Choose based on client needs
5. **Do NOT initialize with README** (already has one)
6. Click "Create repository"

Then push:
```bash
git remote add origin https://github.com/yourusername/smithfamilydental.git
git branch -M main
git push -u origin main
```

---

## Step 7: Deploy to Vercel

### 7.1 Install Vercel CLI (if not already installed)

```bash
npm i -g vercel
```

### 7.2 Login to Vercel

```bash
vercel login
```

### 7.3 Link Project

```bash
vercel link
```

Answer the prompts:
- Set up and deploy? **Y**
- Which scope? **Select your account**
- Link to existing project? **N**
- What's your project's name? **smithfamilydental** (matches client_slug)
- In which directory is your code located? **./** (current directory)

### 7.4 Deploy to Production

```bash
vercel --prod
```

### 7.5 Get Deployment URL

Vercel will output:
```
✅ Production: https://smithfamilydental.vercel.app [copied to clipboard]
```

---

## Step 8: Configure Custom Domain (Optional)

### 8.1 Add Domain in Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project (`smithfamilydental`)
3. Go to Settings → Domains
4. Add domain: `smithfamilydental.com`

### 8.2 Update DNS Records

Add these records to your domain registrar:

**For root domain (smithfamilydental.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 8.3 Verify Domain

Vercel will automatically verify and issue SSL certificate (usually takes 5-30 minutes).

---

## Step 9: Post-Deployment Checklist

### 9.1 Functionality Check
- [ ] All pages load correctly
- [ ] Phone number is clickable
- [ ] Booking link works
- [ ] All images display
- [ ] Smooth scrolling works
- [ ] Responsive on mobile

### 9.2 Content Review
- [ ] No placeholder text ("[Patient Name]")
- [ ] All testimonials are real
- [ ] Doctor bio is accurate
- [ ] Office hours are correct
- [ ] Contact information is correct

### 9.3 Performance
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Page loads in < 3 seconds

---

## Ongoing Maintenance

### Adding New Testimonials

```bash
cd ~/Documents/GitHub/smithfamilydental
# Edit data/master.ts
# Add new review to sampleReviews array
git add data/master.ts
git commit -m "Add new patient testimonial"
git push
# Vercel auto-deploys on push
```

### Updating Content

```bash
# Edit files as needed
git add .
git commit -m "Update office hours"
git push
# Auto-deploys
```

### Updating Images

```bash
# Replace images in public/images/
git add public/images/
git commit -m "Update team photos"
git push
```

---

## Troubleshooting

### Build Fails on Vercel

**Problem:** `Cannot read properties of undefined`
**Solution:** Check that `sampleReviews` array has at least 3 items in `data/master.ts`

**Problem:** Images don't load
**Solution:** Check that image paths match exactly (case-sensitive) in `public/images/`

### Brand Color Not Applied

**Problem:** Still seeing default teal color
**Solution:**
```bash
# Check globals.css
grep "primary-brand" app/globals.css
# Should show your hex color, not #0f766e
```

If wrong, re-scaffold with correct color in client-intake.json

### Domain Not Verifying

**Problem:** Domain shows "pending" for hours
**Solution:**
- Check DNS propagation: https://www.whatsmydns.net/
- Verify DNS records are correct
- Wait up to 48 hours for full propagation

---

## Quick Reference Commands

```bash
# Scaffold new client site
npm run scaffold

# Test locally
cd ../[client-slug]
npm run dev

# Build production
npm run build

# Deploy to Vercel
vercel --prod

# View deployment
vercel ls

# Check logs
vercel logs
```

---

## Summary

You now have a complete workflow for:
1. ✅ Duplicating T1/T2/T3 templates
2. ✅ Customizing with client data
3. ✅ Creating standalone GitHub repos
4. ✅ Deploying to Vercel with custom domains

Each client site is completely independent and can be managed separately.

---

## Support

For issues with the scaffold system:
- Check FIXED_ISSUES.md in each project
- Review MISSING_DATA.md for incomplete fields
- Verify client-intake.json has all required fields

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- GitHub Docs: https://docs.github.com
