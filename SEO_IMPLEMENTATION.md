# SEO Implementation for All Templates

This document tracks the implementation of TAPS/SEO SOP requirements across all templates (T1, T2, T3).

## ✅ Currently Implemented

### Metadata
- ✅ **Title Tag**: Dynamic `[Primary GBP Category] in [City], [State] | [Practice Name]`
  - Location: `app/(templates)/*/page.tsx` line 24
  - Format matches SEO requirement exactly

- ✅ **Meta Description**: Includes city, services, and practice name
  - Location: `app/(templates)/*/page.tsx` line 25
  - **NEEDS**: Add CTA ("Call today" or "Book online")

### Structure
- ✅ **NAP in Footer**: All templates have footer with address/phone
- ✅ **Single H1**: Each template has one H1 tag
- ✅ **Heading Hierarchy**: H1 → H2 → H3 structure present

## ❌ Missing SEO Requirements

### Critical (Must Add)

1. **Schema.org Structured Data**
   - Status: ❌ Not implemented
   - Required: LocalBusiness → Dentist schema with:
     - Practice name
     - Address
     - Phone number
     - Hours of operation
     - Medical specialty
   - Implementation: Add to `app/layout.tsx` as JSON-LD script

2. **Image Alt Text**
   - Status: ❌ Mostly missing
   - Required: All images need descriptive alt text with keywords
   - Priority images:
     - Office exterior
     - Team photos
     - Treatment rooms
     - Before/after cases
   - Implementation: Add alt prop to all `<Image>` components

3. **Google Maps Embed**
   - Status: ❌ Not implemented
   - Required: Embed on homepage and Contact page
   - Implementation: Create `<GoogleMapEmbed>` component using iframe

4. **Contact/About Pages**
   - Status: ❌ Templates are single-page
   - Required: Separate "Contact Us" and "About/Meet the Doctor" pages
   - Implementation: Create route structure for multi-page

5. **Meta Description CTA**
   - Status: ⚠️ Partial - missing CTA
   - Current: Describes services
   - Needs: Add "Call today to schedule" or "Book online in 60 seconds"

### Important (Should Add)

6. **Secondary Category H2 Sections**
   - Status: ⚠️ Partial - some services listed
   - Required: H2 for each secondary GBP category with 50-100 words
   - Common categories:
     - Cosmetic Dentist
     - Emergency Dental Service
     - Dental Implants Provider
     - Teeth Whitening Service
   - Implementation: Add to services section

7. **Local Mentions**
   - Status: ❌ Generic content
   - Required: Specific neighborhoods, landmarks, schools
   - Example: "Conveniently located near [landmark], minutes from [neighborhood]"
   - Implementation: Add to master.ts data structure

8. **Trust Signals**
   - Status: ⚠️ Partial
   - Have: Reviews display
   - Missing:
     - Insurance accepted messaging
     - New patient specials
     - ADA membership badges
     - Sedation/anxiety messaging (if offered)
     - Emergency availability

9. **Practice Overview & Service Area**
   - Status: ⚠️ Partial
   - Required: Years serving community, service radius
   - Implementation: Add section with local area details

10. **Click-to-Call in Header**
    - Status: ✅ Present in all templates
    - Verify: Works correctly on mobile

## Implementation Plan

### Phase 1: Critical SEO Infrastructure (Priority 1)

1. **Add Schema.org JSON-LD**
   ```typescript
   // app/layout.tsx
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "Dentist",
     "name": "{practice name}",
     "address": {...},
     "telephone": "{phone}",
     "openingHours": [...],
     "priceRange": "$$",
     "image": "{logo}",
     "url": "{website}"
   }
   </script>
   ```

2. **Create SEO Data Structure**
   ```typescript
   // types/seo.ts
   export interface SEOData {
     schema: LocalBusinessSchema;
     localMentions: string[];
     serviceAreas: string[];
     trustSignals: TrustSignal[];
   }
   ```

3. **Add Alt Text to All Images**
   - Scan all templates
   - Add descriptive alt text with city + service keywords
   - Priority: office photos, team photos, treatment photos

### Phase 2: Content Optimization (Priority 2)

4. **Update Meta Descriptions**
   - Add CTA to all template metadata
   - Format: "{Description}. Call today to schedule your appointment at {phone}."

5. **Add Secondary Category Sections**
   - Create component for service category cards
   - Each with H2 + 50-100 word description
   - Pull from `locations[0].secondaryCategoriesGBP`

6. **Add Local Mentions**
   - Extend master.ts with neighborhood data
   - Add landmarks, schools, local references
   - Integrate naturally into copy

### Phase 3: Additional Pages & Components (Priority 3)

7. **Create Contact Page**
   - Route: `/contact`
   - Include: NAP, Google Map embed, contact form
   - Schema: ContactPage type

8. **Create About/Meet Doctor Page**
   - Route: `/about` or `/meet-the-doctor`
   - Include: Bio, credentials, photos
   - Schema: Person type

9. **Add Google Maps Component**
   ```typescript
   // components/GoogleMapEmbed.tsx
   export function GoogleMapEmbed({ mapUrl }: { mapUrl: string }) {
     return <iframe src={mapUrl} ... />
   }
   ```

10. **Add Trust Signals Component**
    ```typescript
    // components/TrustSignals.tsx
    - Insurance badges
    - ADA membership
    - New patient specials
    - Emergency availability
    ```

## Testing Checklist

Before deploying any scaffolded site:

- [ ] Schema validates in [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] One H1 per page
- [ ] Heading hierarchy: H1 → H2 → H3 (no skips)
- [ ] All images have alt text
- [ ] NAP matches GBP exactly (character-for-character)
- [ ] NAP appears in: homepage, footer, contact page
- [ ] Meta description includes CTA
- [ ] Phone number click-to-call works on mobile
- [ ] Google Maps embed displays correctly
- [ ] Mobile responsive (all sections)

## Multi-Location Considerations

For practices with multiple locations:

- [ ] Title tag includes both cities
- [ ] H1 includes both cities
- [ ] Schema includes all location addresses
- [ ] Separate click-to-call per office
- [ ] Map embed for each location
- [ ] Reviews from all location GBPs
- [ ] Service area outlined for each office
- [ ] Local mentions for each city

## Files to Update

### Scaffold Script
- `scripts/scaffold-client.ts`
  - Add schema generation
  - Add SEO data generation
  - Add alt text prompts

### Data Structure
- `data/master.ts`
  - Add `seoData` section
  - Add `localMentions` array
  - Add `serviceAreas` array
  - Add `trustSignals` object

### Components to Create
- `components/seo/SchemaMarkup.tsx`
- `components/seo/GoogleMapEmbed.tsx`
- `components/seo/TrustSignals.tsx`
- `components/seo/ServiceCategories.tsx`

### Templates to Update
- All three templates need:
  - Schema in layout
  - Updated metadata with CTA
  - Alt text on all images
  - Secondary category sections
  - Local mentions in copy

## Next Steps

1. **Immediate**: Add schema markup to app/layout.tsx
2. **Immediate**: Update meta descriptions with CTAs
3. **This week**: Add alt text to all template images
4. **This week**: Create GoogleMapEmbed component
5. **Next week**: Create Contact and About pages
6. **Next week**: Add local mentions system to master.ts

---

**Status**: In Progress
**Last Updated**: 2026-07-01
**Owner**: Development Team
