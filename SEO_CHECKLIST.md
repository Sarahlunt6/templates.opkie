# SEO Checklist for Scaffolded Sites

Use this checklist after scaffolding each client site to ensure full SEO optimization.

## ✅ Pre-Deployment SEO Checklist

### 1. Schema Markup
- [ ] Schema.org JSON-LD is present in page source
- [ ] Validates in [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Includes: name, address, phone, hours, specialty
- [ ] For multi-location: all locations in schema

### 2. Metadata
- [ ] Title tag: `[Primary Category] in [City], [State] | [Practice Name]`
- [ ] Meta description includes CTA ("Call today" or "Book online")
- [ ] Open Graph tags for social sharing
- [ ] Viewport meta tag for mobile

### 3. NAP (Name, Address, Phone) Consistency
- [ ] Homepage has NAP
- [ ] Footer has NAP
- [ ] Contact page has NAP
- [ ] Format matches GBP EXACTLY (character-for-character)
- [ ] Phone number is click-to-call (`tel:` link)

### 4. Heading Structure
- [ ] ONE H1 per page
- [ ] H1 includes: `[Category] in [City]`
- [ ] H2s for each secondary GBP category
- [ ] Hierarchy: H1 → H2 → H3 (no skips)

### 5. Images
- [ ] All images have alt text
- [ ] Alt text is descriptive + includes keywords naturally
- [ ] Priority images:
  - [ ] Office exterior
  - [ ] Team/doctor photos
  - [ ] Treatment rooms
  - [ ] Before/after cases
- [ ] Images optimized for web (< 200KB each)

### 6. Content Requirements
- [ ] First 1-2 sentences name the city served
- [ ] 50-100 words under each H2 service category
- [ ] Practice overview section (years serving, doctor background)
- [ ] Service area/radius clearly stated
- [ ] Local mentions (neighborhoods, landmarks, schools)

### 7. Trust Signals
- [ ] Google Reviews widget displayed
- [ ] Google Maps embedded
- [ ] Doctor photo visible
- [ ] Credentials listed (ADA, state association, etc.)
- [ ] Insurance acceptance mentioned (if applicable)
- [ ] New patient special (if applicable)
- [ ] Sedation/anxiety messaging (if offered)
- [ ] Emergency availability stated

### 8. Technical SEO
- [ ] Mobile responsive
- [ ] Click-to-call works on mobile
- [ ] Page loads in < 3 seconds
- [ ] No console errors
- [ ] HTTPS enabled
- [ ] Favicon present

### 9. Required Pages
- [ ] Homepage (GBP landing page)
- [ ] About Us / Meet the Doctor
- [ ] Contact Us (with map embed)

### 10. Multi-Location Specific (if applicable)
- [ ] Title includes both cities
- [ ] H1 includes both cities
- [ ] Click-to-call for each office
- [ ] Map for each location
- [ ] Reviews from all GBPs
- [ ] Service area for each office

---

## 🔧 Implementation Steps

### Step 1: Add Schema to Layout

Edit `app/layout.tsx`:

\`\`\`typescript
import { SchemaMarkup } from "@/components/seo";
import { clientMasterData } from "@/data/master";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <SchemaMarkup practiceData={clientMasterData} />
      </head>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

### Step 2: Update Metadata with CTA

Edit `app/page.tsx`:

\`\`\`typescript
export const metadata: Metadata = {
  title: `${location.primaryCategoryGBP} in ${location.cityServed}, ${location.stateServed} | ${location.practiceNameGBP}`,
  description: `Trusted ${location.primaryCategoryGBP.toLowerCase()} serving ${location.cityServed}. Accepting new patients for comprehensive dental care. Call ${location.phoneGBP} today to schedule your appointment.`,
};
\`\`\`

### Step 3: Add Image Alt Text

For each image, add descriptive alt text:

\`\`\`typescript
<Image
  src="/images/office-exterior.jpg"
  alt={`${practiceData.globalPracticeName} dental office exterior in ${location.cityServed}, ${location.stateServed}`}
  width={1920}
  height={1080}
/>
\`\`\`

### Step 4: Add Google Maps

\`\`\`typescript
import { GoogleMapEmbed } from "@/components/seo";

<GoogleMapEmbed
  mapUrl={location.googleMapsEmbedUrl}
  practiceName={location.practiceNameGBP}
  className="h-96 w-full"
/>
\`\`\`

### Step 5: Verify NAP Consistency

Ensure these match EXACTLY:
- GBP listing
- Website homepage
- Website footer
- Contact page

---

## 🎯 SEO Best Practices by Template

### T1 (Prestige Leader)
- Emphasize: luxury, credentials, premium experience
- Alt text style: "Premium dental care facility"
- H2 categories: Cosmetic Dentist, Dental Implants, Veneers

### T2 (Clinical Innovator)
- Emphasize: technology, precision, advanced procedures
- Alt text style: "Advanced dental technology lab"
- H2 categories: Dental Implants Provider, Sedation Dentist, CBCT Imaging

### T3 (Spatial Sanctuary)
- Emphasize: comfort, anxiety-free, holistic care
- Alt text style: "Calming dental treatment room"
- H2 categories: Sedation Dentist, Family Dentist, Anxiety-Free Care

---

## 🔍 Testing Tools

### Validation
- **Schema**: https://search.google.com/test/rich-results
- **Mobile**: https://search.google.com/test/mobile-friendly
- **Page Speed**: https://pagespeed.web.dev/

### Verification
\`\`\`bash
# Check for H1 (should return 1)
grep -c "<h1" dist/index.html

# Check for schema
grep "application/ld+json" dist/index.html

# Check NAP consistency
grep -i "phone" dist/index.html
\`\`\`

---

## 📋 Common Issues & Fixes

### Issue: Schema doesn't validate
**Fix**: Check that all required fields (name, address, phone) are filled in `data/master.ts`

### Issue: Multiple H1 tags
**Fix**: Ensure hero section uses H1, all other sections use H2/H3

### Issue: Images missing alt text
**Fix**: Run the alt text audit script (see below)

### Issue: NAP doesn't match GBP
**Fix**: Copy exact format from GBP, including punctuation

### Issue: Meta description too long (>160 chars)
**Fix**: Shorten while keeping CTA at the end

---

## 🤖 Automated Alt Text Script

\`\`\`bash
# Find all images without alt text
grep -r "<Image" app/ | grep -v "alt="

# Or use Claude Code to scan and add alt text:
# Prompt: "Scan all images in /app and /public/images, view each one,
# and add descriptive alt text that includes the city name and service
# keywords where appropriate. Update the Image components with the alt text."
\`\`\`

---

## 📝 SEO Data Structure

Ensure `data/master.ts` includes:

\`\`\`typescript
export const clientMasterData: MasterDentalPracticeSchema = {
  globalPracticeName: "Practice Name",
  brandingLogoUrl: "/images/logo.svg",
  onlineBookingUrl: "https://...",

  locations: [{
    practiceNameGBP: "Exact GBP name",
    primaryCategoryGBP: "Dentist",
    secondaryCategoriesGBP: [
      "Cosmetic Dentist",
      "Emergency Dental Service",
      // ... more categories
    ],
    addressGBP: "123 Main St", // EXACT format from GBP
    cityServed: "Portland",
    stateServed: "OR",
    phoneGBP: "(555) 123-4567", // EXACT format from GBP
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?...",
    hoursOfOperation: [
      { dayRange: "Monday", structuralHours: "8:00 AM - 5:00 PM" },
      // ... more days
    ],
    localizedNeighborhoods: [
      "Downtown",
      "Pearl District",
      // ... local areas
    ]
  }],

  doctors: [{
    name: "Dr. John Smith, DDS",
    credentials: ["DDS", "FAGD"],
    // ...
  }]
};
\`\`\`

---

**Last Updated**: 2026-07-01
**Version**: 1.0
