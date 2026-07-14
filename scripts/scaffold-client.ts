#!/usr/bin/env tsx
/**
 * CLIENT SITE SCAFFOLD SCRIPT
 *
 * Creates a fully standalone client site from T1/T2/T3 templates
 * by copying the chosen template and replacing all placeholder data
 * with real client information from client-intake.json.
 *
 * Usage: npx tsx scripts/scaffold-client.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// ═══════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════

interface ClientIntake {
  client_slug: string;
  template: 't1' | 't2' | 't3' | 't4' | 't5';
  practice: {
    name: string;
    tagline_override: string | null;
    phone: string;
    phone_link: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    hours: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
  };
  doctor: {
    name: string;
    title: string;
    years_experience: number | null;
    credentials: string[];
    bio_short: string | null;
  };
  booking_link: string;
  brand: {
    accent_color: string | null;
    logo_path: string | null;
  };
  membership: {
    individual_price: number | null;
    couple_price: number | null;
    family_price: number | null;
    no_insurance_savings_plan_price: number | null;
  };
  stats: {
    google_rating: number | null;
    review_count: number | null;
    patients_served: number | null;
    satisfaction_rate: number | null;
  };
  /**
   * Honest trust signals. Booleans default to FALSE when absent — the
   * templates conditionally render sedation/emergency claims and insurance
   * names, so a wrong `true` here puts false medical claims on a live site.
   */
  trust_signals?: {
    has_same_day_emergency?: boolean;
    has_sedation_anxiety_care?: boolean;
    /** Insurance networks the practice actually accepts, e.g. ["Delta Dental", "Cigna"] */
    insurance_networks?: string[];
  };
  vercel: {
    project_name: string;
    domain: string | null;
  };
}

interface MissingField {
  path: string;
  fieldName: string;
  context: string;
}

// ═══════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════

async function main() {
  console.log('🚀 OPKIE CLIENT SITE SCAFFOLD\n');

  // 1. Load and validate intake data
  const intakeData = loadIntakeData();
  validateMinimumFields(intakeData);

  // 2. Set up paths
  const templatesRoot = path.resolve(__dirname, '..');
  const templateSource = path.join(templatesRoot, 'app', '(templates)', intakeData.template);
  const clientRoot = path.resolve(templatesRoot, '..', intakeData.client_slug);

  console.log(`📋 Client: ${intakeData.practice.name}`);
  console.log(`📐 Template: ${intakeData.template.toUpperCase()}`);
  console.log(`📁 Output: ${clientRoot}\n`);

  // 3. Check if target already exists
  if (fs.existsSync(clientRoot)) {
    throw new Error(`Target directory already exists: ${clientRoot}\nPlease remove it or choose a different client_slug.`);
  }

  // 4. Create project structure
  console.log('📦 Creating standalone project structure...');
  createProjectStructure(clientRoot, templateSource, templatesRoot);

  // 5. Generate master.ts data file from intake
  console.log('📝 Generating data/master.ts from intake...');
  const missingFields: MissingField[] = [];
  generateMasterDataFile(clientRoot, intakeData, missingFields);

  // 6. Find and replace remaining placeholder data
  console.log('🔄 Replacing placeholder data with client info...');
  await replaceAllPlaceholders(clientRoot, intakeData, missingFields);

  // 7. Update brand colors if provided
  if (intakeData.brand.accent_color) {
    console.log('🎨 Applying brand colors...');
    updateBrandColors(clientRoot, intakeData.brand.accent_color);
  }

  // 8. Per-client page metadata + schema markup.
  // The t2/t3 template pages are client components and cannot export
  // metadata, so the copied root layout.tsx must carry the client's
  // title/description — otherwise the site ships with Opkie's own.
  console.log('🔍 Writing per-client metadata and schema markup...');
  generateClientMetadata(clientRoot, intakeData);
  injectSchemaMarkup(clientRoot);

  // 9. Generate MISSING_DATA.md
  if (missingFields.length > 0) {
    console.log(`⚠️  Generating MISSING_DATA.md (${missingFields.length} fields)...`);
    generateMissingDataReport(clientRoot, missingFields, intakeData);
  }

  // 10. Create SEO checklist
  console.log('📋 Creating SEO checklist...');
  createSEOChecklist(clientRoot, intakeData);

  // 11. Update project metadata
  console.log('📝 Updating project metadata...');
  updateProjectMetadata(clientRoot, intakeData);

  // 12. Initialize git
  console.log('🌿 Initializing git repository...');
  execSync('git init', { cwd: clientRoot, stdio: 'inherit' });
  execSync('git add .', { cwd: clientRoot, stdio: 'inherit' });
  execSync(`git commit -m "Initial scaffold from ${intakeData.template.toUpperCase()} template for ${intakeData.practice.name}"`, {
    cwd: clientRoot,
    stdio: 'inherit'
  });

  // 13. Verify build
  console.log('\n🔨 Installing dependencies and verifying build...');
  try {
    execSync('npm install', { cwd: clientRoot, stdio: 'inherit' });
    execSync('npm run build', { cwd: clientRoot, stdio: 'inherit' });
    console.log('\n✅ Build successful!');
  } catch (error) {
    console.error('\n❌ Build failed. Please review errors above.');
    throw error;
  }

  // 14. Final summary
  console.log('\n' + '═'.repeat(60));
  console.log('✨ SCAFFOLD COMPLETE!');
  console.log('═'.repeat(60));
  console.log(`\n📁 Project location: ${clientRoot}`);
  console.log(`\n🚀 Next steps:`);
  console.log(`   1. cd ${intakeData.client_slug}`);
  console.log(`   2. Review MISSING_DATA.md if present`);
  console.log(`   3. Run: vercel link`);
  console.log(`   4. Run: vercel deploy\n`);
}

// ═══════════════════════════════════════════════════════════════════════
// SEO INJECTION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

function injectSchemaMarkup(clientRoot: string) {
  const layoutPath = path.join(clientRoot, 'app', 'layout.tsx');
  if (!fs.existsSync(layoutPath)) return;

  let content = fs.readFileSync(layoutPath, 'utf-8');

  // Add import at the top if not already present
  if (!content.includes('import { SchemaMarkup }')) {
    // Find the last import statement
    const importRegex = /^import .+;$/gm;
    const imports = content.match(importRegex);
    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      content = content.replace(
        lastImport,
        `${lastImport}\nimport { SchemaMarkup } from "@/components/seo";`
      );
    }
  }

  // Add clientMasterData import if not present
  if (!content.includes('import { clientMasterData }') && !content.includes('import clientMasterData')) {
    const importRegex = /^import .+;$/gm;
    const imports = content.match(importRegex);
    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      content = content.replace(
        lastImport,
        `${lastImport}\nimport { clientMasterData } from "@/data/master";`
      );
    }
  }

  // Inject SchemaMarkup as the first child of <body>. The app router does
  // not support a hand-written <head> in the root layout; JSON-LD is read
  // by search engines anywhere in the document.
  if (!content.includes('<SchemaMarkup')) {
    content = content.replace(
      /(<body[^>]*>)/,
      `$1\n        <SchemaMarkup practiceData={clientMasterData} />`
    );
  }

  fs.writeFileSync(layoutPath, content, 'utf-8');
}

/**
 * Rewrite the metadata export in the copied app/layout.tsx with the
 * client's own title and description. Without this, sites scaffolded
 * from client-component templates (t2/t3) launch with the template
 * showcase's metadata in search results.
 */
function generateClientMetadata(clientRoot: string, intake: ClientIntake) {
  const layoutPath = path.join(clientRoot, 'app', 'layout.tsx');
  if (!fs.existsSync(layoutPath)) return;

  let content = fs.readFileSync(layoutPath, 'utf-8');

  const { name, phone, address } = intake.practice;
  const title = `${name} — Dentist in ${address.city}, ${address.state}`;
  const description =
    `${name} provides comprehensive dental care in ${address.city}, ${address.state}. ` +
    `New patients welcome. Call ${phone} to schedule your appointment.`;

  const metadataBlock =
    `export const metadata: Metadata = {\n` +
    `  title: ${JSON.stringify(title)},\n` +
    `  description: ${JSON.stringify(description)},\n` +
    `};`;

  const metadataRegex = /export const metadata: Metadata = \{[\s\S]*?\};/;
  if (metadataRegex.test(content)) {
    content = content.replace(metadataRegex, metadataBlock);
  } else {
    throw new Error(
      'Could not find a metadata export in app/layout.tsx to rewrite — ' +
        'the client site would launch with missing page metadata.'
    );
  }

  fs.writeFileSync(layoutPath, content, 'utf-8');
}

function createSEOChecklist(clientRoot: string, intake: ClientIntake) {
  const checklistContent = `# SEO Pre-Launch Checklist

Client: ${intake.practice.name}
Generated: ${new Date().toISOString().split('T')[0]}

## ✅ Automated SEO Optimizations (Already Done)

- ✅ **Schema.org Markup**: LocalBusiness/Dentist schema automatically injected in layout.tsx
- ✅ **Page Metadata**: Per-client title and description (with call-to-schedule CTA) written into layout.tsx
- ✅ **Google Maps Embed**: The template's visit section renders a keyless map from master.ts (no API key needed)
- ✅ **Proper Heading Hierarchy**: H1 → H2 → H3 structure maintained in template
- ✅ **Click-to-Call Links**: All phone numbers use tel: links
- ✅ **NAP Consistency**: Name, Address, Phone pulled from master.ts throughout site

## ⚠️ Manual SEO Tasks (Do Before Launch)

### 1. Image Alt Text
- [ ] Review all images and add descriptive alt text
- [ ] Include city name and service keywords naturally
- [ ] Format: "[Service] at [Practice Name] in [City], [State]"

**Action**: Search for \`<Image\` components and verify alt text is descriptive and SEO-friendly.

### 2. Local Neighborhood Mentions
- [ ] Add local neighborhood names to content
- [ ] Mention nearby landmarks, schools, or popular areas
- [ ] Update \`data/master.ts\` → \`localizedNeighborhoods\` array

**Examples**: "Serving [Neighborhood 1], [Neighborhood 2], and surrounding areas"

### 3. Secondary GBP Categories
- [ ] Verify secondary categories in data/master.ts match Google Business Profile
- [ ] Ensure each secondary category has its own H2 section on homepage (50-100 words)

**Current Categories** (from data/master.ts): the \`secondaryCategoriesGBP\` array starts empty — copy the categories from the client's Google Business Profile listing.

### 4. Testimonials
- [ ] Add real patient reviews to \`sampleReviews\` in data/master.ts (the array starts empty — review sections and rating stats stay hidden until reviews exist)
- [ ] Get patient consent for using reviews
- [ ] Include patient initials or first names only
- [ ] Add verification badges (google, facebook, yelp)

### 5. Real Images
- [ ] Replace placeholder images in \`public/images/\`:
  - [ ] \`team/doctor-portrait.png\` - Professional headshot
  - [ ] \`team/staff-photo.jpg\` - Team photo
  - [ ] \`office-exterior.jpg\` - Building exterior
  - [ ] \`office-interior.jpg\` - Waiting room/interior
  - [ ] \`cases/smile-before.png\` - Before/after photos (with consent)
  - [ ] \`cases/smile-after.png\`

### 6. Map Embed
- [ ] Load the site and confirm the visit-section map shows the correct address (the keyless embed URL is generated from the intake address — no API key needed)

### 7. Verify NAP Matches GBP Exactly
- [ ] Compare website NAP to Google Business Profile listing
- [ ] Must match character-for-character (including spacing, punctuation)
- [ ] Check footer, contact page, schema markup

**Current NAP**:
- Name: ${intake.practice.name}
- Address: ${intake.practice.address.street}, ${intake.practice.address.city}, ${intake.practice.address.state} ${intake.practice.address.zip}
- Phone: ${intake.practice.phone}

### 8. Content Review
- [ ] Review all text for placeholder content
- [ ] Ensure doctor bio is accurate and compelling
- [ ] Verify all services listed are offered
- [ ] Check that specialty/credentials are correct

## 🔍 Pre-Launch Validation

### Schema Validation
- [ ] Visit: https://search.google.com/test/rich-results
- [ ] Enter: https://[your-domain].vercel.app
- [ ] Verify: No errors, schema detected correctly

### Heading Hierarchy Check
- [ ] Visit: https://www.websiteplanet.com/webtools/seo-checker/
- [ ] Enter: https://[your-domain].vercel.app
- [ ] Verify: One H1, proper H2/H3 structure

### Mobile-Friendly Test
- [ ] Visit: https://search.google.com/test/mobile-friendly
- [ ] Enter: https://[your-domain].vercel.app
- [ ] Verify: Page is mobile-friendly

### Page Speed
- [ ] Visit: https://pagespeed.web.dev/
- [ ] Enter: https://[your-domain].vercel.app
- [ ] Target: 90+ score on mobile and desktop

## 📊 Post-Launch SEO

### Google Business Profile
- [ ] Verify GBP listing is claimed and verified
- [ ] Add website URL to GBP
- [ ] Ensure NAP matches website exactly
- [ ] Add photos to GBP listing
- [ ] Encourage patients to leave reviews

### Google Search Console
- [ ] Add property in Google Search Console
- [ ] Verify ownership via DNS or HTML tag
- [ ] Submit sitemap: https://[your-domain].vercel.app/sitemap.xml
- [ ] Monitor for indexing issues

### Analytics
- [ ] Set up Google Analytics 4
- [ ] Add GA4 tracking code to site
- [ ] Set up conversion tracking for:
  - Booking button clicks
  - Phone number clicks
  - Form submissions

---

## 🎯 Priority Order

**Before Launch** (Critical):
1. Replace placeholder testimonials
2. Add real images with alt text
3. Get Google Maps API key
4. Verify NAP matches GBP
5. Validate schema markup

**Week 1 After Launch**:
1. Submit to Google Search Console
2. Set up analytics
3. Add local neighborhood mentions

**Ongoing**:
1. Collect and add new patient testimonials
2. Monitor search rankings
3. Add new service pages as needed

---

**Status**: Ready for manual review and launch preparation
**Last Updated**: ${new Date().toISOString().split('T')[0]}
`;

  fs.writeFileSync(path.join(clientRoot, 'SEO_CHECKLIST.md'), checklistContent, 'utf-8');
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

function loadIntakeData(): ClientIntake {
  const intakePath = path.resolve(__dirname, '..', 'client-intake.json');
  if (!fs.existsSync(intakePath)) {
    throw new Error('client-intake.json not found. Please create it first.');
  }
  return JSON.parse(fs.readFileSync(intakePath, 'utf-8'));
}

function validateMinimumFields(data: ClientIntake) {
  const required = ['client_slug', 'template', 'practice.name', 'booking_link'];
  const missing: string[] = [];

  if (!data.client_slug) missing.push('client_slug');
  if (!data.template) missing.push('template');
  if (!data.practice?.name) missing.push('practice.name');
  if (!data.booking_link) missing.push('booking_link');

  if (missing.length > 0) {
    throw new Error(`Missing required fields in client-intake.json: ${missing.join(', ')}`);
  }

  if (!['t1', 't2', 't3'].includes(data.template)) {
    throw new Error(`Invalid template "${data.template}". Must be t1, t2, or t3.`);
  }
}

function createProjectStructure(
  clientRoot: string,
  templateSource: string,
  templatesRoot: string
) {
  // Create client directory
  fs.mkdirSync(clientRoot, { recursive: true });

  // Create app directory
  const appDir = path.join(clientRoot, 'app');
  fs.mkdirSync(appDir, { recursive: true });

  // Copy root layout.tsx from app directory
  const rootLayout = path.join(templatesRoot, 'app', 'layout.tsx');
  if (fs.existsSync(rootLayout)) {
    fs.copyFileSync(rootLayout, path.join(appDir, 'layout.tsx'));
  }

  // Copy globals.css if it exists
  const globalsCss = path.join(templatesRoot, 'app', 'globals.css');
  if (fs.existsSync(globalsCss)) {
    fs.copyFileSync(globalsCss, path.join(appDir, 'globals.css'));
  }

  // Copy template page.tsx and components to app root
  const templatePageSrc = path.join(templateSource, 'page.tsx');
  const templatePageDest = path.join(appDir, 'page.tsx');
  if (fs.existsSync(templatePageSrc)) {
    fs.copyFileSync(templatePageSrc, templatePageDest);
  }

  // Copy template components directory
  const templateComponentsSrc = path.join(templateSource, 'components');
  const templateComponentsDest = path.join(appDir, 'components');
  if (fs.existsSync(templateComponentsSrc)) {
    copyRecursive(templateComponentsSrc, templateComponentsDest);
  }

  // Copy any other template-specific files (like PREMIUM_MOTION_DESIGN.md)
  const templateFiles = fs.readdirSync(templateSource);
  for (const file of templateFiles) {
    if (file !== 'page.tsx' && file !== 'components') {
      const src = path.join(templateSource, file);
      const dest = path.join(appDir, file);
      const stat = fs.statSync(src);
      if (stat.isFile()) {
        fs.copyFileSync(src, dest);
      }
    }
  }

  // Copy essential root files from templates project
  const rootFiles = [
    'package.json',
    'package-lock.json', // pin dependency versions so client builds are reproducible
    'tsconfig.json',
    'tailwind.config.js',
    'tailwind.config.ts',
    'postcss.config.js',
    'postcss.config.mjs',
    'next.config.js',
    'next.config.ts',
    '.gitignore',
    '.eslintrc.json',
  ];

  for (const file of rootFiles) {
    const src = path.join(templatesRoot, file);
    const dest = path.join(clientRoot, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }

  // Copy shared directories (excluding ortho-specific files)
  const sharedDirs = ['components', 'hooks', 'lib', 'public', 'types'];
  for (const dir of sharedDirs) {
    const src = path.join(templatesRoot, dir);
    const dest = path.join(clientRoot, dir);
    if (fs.existsSync(src)) {
      copyRecursive(src, dest);
    }
  }

  // Copy data directory but exclude ortho files
  const dataDir = path.join(templatesRoot, 'data');
  if (fs.existsSync(dataDir)) {
    const dataDest = path.join(clientRoot, 'data');
    fs.mkdirSync(dataDest, { recursive: true });

    const dataFiles = fs.readdirSync(dataDir);
    for (const file of dataFiles) {
      // Skip ortho-specific files unless needed
      if (file.includes('ortho')) continue;

      const src = path.join(dataDir, file);
      const dest = path.join(dataDest, file);
      if (fs.statSync(src).isFile()) {
        fs.copyFileSync(src, dest);
      }
    }
  }
}

function copyRecursive(src: string, dest: string) {
  if (!fs.existsSync(src)) return;

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const files = fs.readdirSync(src);
    for (const file of files) {
      if (file === 'node_modules' || file === '.next' || file === '.git') continue;
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function generateMasterDataFile(
  clientRoot: string,
  intake: ClientIntake,
  missingFields: MissingField[]
) {
  const masterDataPath = path.join(clientRoot, 'data', 'master.ts');

  // Keyless Google Maps embed URL — no API key or Cloud Console step needed
  const mapsQuery = encodeURIComponent(`${intake.practice.address.street}, ${intake.practice.address.city}, ${intake.practice.address.state} ${intake.practice.address.zip}`);
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  // Format hours of operation
  const hoursOfOperation = [
    { dayRange: 'Monday', structuralHours: intake.practice.hours.monday },
    { dayRange: 'Tuesday', structuralHours: intake.practice.hours.tuesday },
    { dayRange: 'Wednesday', structuralHours: intake.practice.hours.wednesday },
    { dayRange: 'Thursday', structuralHours: intake.practice.hours.thursday },
    { dayRange: 'Friday', structuralHours: intake.practice.hours.friday },
    { dayRange: 'Saturday', structuralHours: intake.practice.hours.saturday },
    { dayRange: 'Sunday', structuralHours: intake.practice.hours.sunday },
  ].filter(day => day.structuralHours && day.structuralHours !== '');

  // Build credentials array
  const credentials = intake.doctor.credentials.filter(c => c && c !== '');

  // Honest trust signals — default to FALSE and flag for follow-up rather
  // than putting unverified medical claims on a live site.
  const trust = intake.trust_signals ?? {};
  if (trust.has_same_day_emergency === undefined) {
    missingFields.push({
      path: masterDataPath,
      fieldName: 'trust_signals.has_same_day_emergency',
      context: 'Defaulted to false — set true only if the practice offers same-day emergency care',
    });
  }
  if (trust.has_sedation_anxiety_care === undefined) {
    missingFields.push({
      path: masterDataPath,
      fieldName: 'trust_signals.has_sedation_anxiety_care',
      context: 'Defaulted to false — set true only if the practice offers sedation/anxiety care',
    });
  }
  const insuranceNetworks = (trust.insurance_networks ?? []).filter(Boolean);
  if (insuranceNetworks.length === 0) {
    missingFields.push({
      path: masterDataPath,
      fieldName: 'trust_signals.insurance_networks',
      context: 'No insurance networks listed — templates will show generic insurance copy without carrier names',
    });
  }
  const insuranceAcceptedText = insuranceNetworks.length
    ? `We accept most major dental insurance plans including ${formatList(insuranceNetworks)}. Contact us to verify your coverage.`
    : 'We accept most major dental insurance plans. Contact us to verify your coverage.';

  const membershipPlanSummary = intake.membership.no_insurance_savings_plan_price
    ? `No insurance? Ask about our ${intake.practice.name} savings plan — $${intake.membership.no_insurance_savings_plan_price}/year for cleanings, exams, and member discounts.`
    : `No insurance? Ask us about our in-house savings plan for uninsured patients.`;

  const masterDataContent = `import type {
  MasterDentalPracticeSchema,
  ReviewData,
  BeforeAfterCase,
} from "@/types/dentist";

export const clientMasterData: MasterDentalPracticeSchema = {
  globalPracticeName: ${JSON.stringify(intake.practice.name)},
  practiceNiche: "dental",
  brandingLogoUrl: ${JSON.stringify(intake.brand.logo_path || '/images/logo-placeholder.svg')},
  onlineBookingUrl: ${JSON.stringify(intake.booking_link)},

  locations: [
    {
      id: "loc-001",
      officeLabel: "Main Office",
      practiceNameGBP: ${JSON.stringify(intake.practice.name)},
      primaryCategoryGBP: "Dentist",
      secondaryCategoriesGBP: [
        // TODO: Replace with this practice's actual Google Business Profile
        // secondary categories — these drive on-page SEO sections
      ],
      addressGBP: ${JSON.stringify(intake.practice.address.street)},
      cityServed: ${JSON.stringify(intake.practice.address.city)},
      stateServed: ${JSON.stringify(intake.practice.address.state)},
      phoneGBP: ${JSON.stringify(intake.practice.phone)},
      googleMapsEmbedUrl: ${JSON.stringify(googleMapsEmbedUrl)},
      hoursOfOperation: ${JSON.stringify(hoursOfOperation, null, 8).replace(/"([^"]+)":/g, '$1:')},
      localizedNeighborhoods: [
        // TODO: Add local neighborhood names for ${intake.practice.address.city.replace(/[^\w\s.,'-]/g, '')}
      ],
    },
  ],

  doctors: [
    {
      name: ${JSON.stringify(intake.doctor.name)},
      role: ${JSON.stringify(intake.doctor.title)},
      credentials: ${JSON.stringify(credentials, null, 8)},
      biography: ${JSON.stringify(intake.doctor.bio_short || 'Dedicated to providing exceptional dental care to our community.')},
      portraitUrl: "/images/team/doctor-portrait.png",
    },
  ],

  theme: {
    primaryBrandHex: ${JSON.stringify(intake.brand.accent_color || '#0f766e')},
    secondaryAccentHex: "#38bdf8",
    textMainHex: "#1e293b",
    bgCanvasHex: "#ffffff",
  },

  trustSignals: {
    insuranceAcceptedText: ${JSON.stringify(insuranceAcceptedText)},
    membershipPlanSummary: ${JSON.stringify(membershipPlanSummary)},
    hasSameDayEmergency: ${trust.has_same_day_emergency === true},
    hasSedationAnxietyCare: ${trust.has_sedation_anxiety_care === true},
  },
};

/**
 * Reviews start EMPTY on purpose. The templates hide their review sections
 * and rating stats until real, consented patient reviews are added here —
 * never launch with invented testimonials.
 */
export const sampleReviews: ReviewData[] = [];

export const sampleBeforeAfterCases: BeforeAfterCase[] = [
  {
    id: "case-001",
    beforeUrl: "/images/cases/smile-before.png",
    afterUrl: "/images/cases/smile-after.png",
    procedureType: "Porcelain Veneers",
    altTag: "Porcelain veneers smile transformation",
  },
  {
    id: "case-002",
    beforeUrl: "/images/cases/smile-before.png",
    afterUrl: "/images/cases/smile-after.png",
    procedureType: "Professional Whitening",
    altTag: "Professional teeth whitening results",
  },
  {
    id: "case-003",
    beforeUrl: "/images/cases/smile-before.png",
    afterUrl: "/images/cases/smile-after.png",
    procedureType: "Invisalign Treatment",
    altTag: "Invisalign orthodontic alignment results",
  },
];

export default clientMasterData;
`;

  fs.writeFileSync(masterDataPath, masterDataContent, 'utf-8');

  // Track fields that always need real client input
  missingFields.push({
    path: masterDataPath,
    fieldName: 'localizedNeighborhoods',
    context: 'Local neighborhood names for SEO and local relevance'
  });
  missingFields.push({
    path: masterDataPath,
    fieldName: 'secondaryCategoriesGBP',
    context: 'Secondary Google Business Profile categories — copy them from the client GBP listing'
  });
  missingFields.push({
    path: masterDataPath,
    fieldName: 'sampleReviews',
    context: 'Real, consented patient reviews — review sections stay hidden until these exist'
  });
}

/** "A", "A and B", or "A, B, and C" */
function formatList(items: string[]): string {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

async function replaceAllPlaceholders(
  clientRoot: string,
  intake: ClientIntake,
  missingFields: MissingField[]
) {
  const files = getAllFiles(clientRoot, ['.tsx', '.ts', '.json', '.md']);

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // Replace practice name
    if (intake.practice.name) {
      content = content.replace(/Summit Dental Group/g, intake.practice.name);
      modified = true;
    }

    // Replace doctor info
    if (intake.doctor.name) {
      content = content.replace(/Dr\. Michael Roberts, DDS/g, intake.doctor.name);
      content = content.replace(/Dr\. Roberts/g, intake.doctor.name.split(',')[0]);
      modified = true;
    }

    if (intake.doctor.title) {
      content = content.replace(/Lead Cosmetic Dentist & Practice Owner/g, intake.doctor.title);
      modified = true;
    }

    // Replace contact info
    if (intake.practice.phone) {
      content = content.replace(/\(801\) 555-0123/g, intake.practice.phone);
      modified = true;
    }

    if (intake.practice.phone_link) {
      content = content.replace(/tel:\+18015550123/g, intake.practice.phone_link);
      modified = true;
    }

    // Replace address
    if (intake.practice.address.street) {
      content = content.replace(/1250 Mountain View Drive, Suite 200/g, intake.practice.address.street);
      modified = true;
    }

    if (intake.practice.address.city) {
      content = content.replace(/Salt Lake City/g, intake.practice.address.city);
      modified = true;
    }

    // Replace booking link
    if (intake.booking_link) {
      content = content.replace(/https:\/\/booking\.example\.com\/summit-dental/g, intake.booking_link);
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf-8');
    }
  }
}

function getAllFiles(dir: string, extensions: string[]): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        results = results.concat(getAllFiles(filePath, extensions));
      }
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        results.push(filePath);
      }
    }
  }

  return results;
}

function updateBrandColors(clientRoot: string, accentColor: string) {
  // Update tailwind config (try both .js and .ts)
  const tailwindConfigs = ['tailwind.config.js', 'tailwind.config.ts'];
  for (const configFile of tailwindConfigs) {
    const tailwindConfig = path.join(clientRoot, configFile);
    if (fs.existsSync(tailwindConfig)) {
      let content = fs.readFileSync(tailwindConfig, 'utf-8');
      content = content.replace(/#0f766e/g, accentColor);
      fs.writeFileSync(tailwindConfig, content, 'utf-8');
    }
  }

  // Update globals.css CSS variables
  const globalsCss = path.join(clientRoot, 'app', 'globals.css');
  if (fs.existsSync(globalsCss)) {
    let content = fs.readFileSync(globalsCss, 'utf-8');
    // Replace the primary brand color in CSS variables
    content = content.replace(
      /--primary-brand:\s*#[0-9a-fA-F]{6};/g,
      `--primary-brand: ${accentColor};`
    );
    fs.writeFileSync(globalsCss, content, 'utf-8');
  }
}

function generateMissingDataReport(
  clientRoot: string,
  missingFields: MissingField[],
  intake: ClientIntake
) {
  const lines = [
    '# MISSING DATA REPORT',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Client: ${intake.practice.name}`,
    `Template: ${intake.template.toUpperCase()}`,
    '',
    '## Action Required',
    '',
    'The following fields are missing from client-intake.json and must be filled in before launch:',
    '',
  ];

  // Group by field name using a plain object
  const grouped: Record<string, MissingField[]> = {};
  for (const field of missingFields) {
    if (!grouped[field.fieldName]) {
      grouped[field.fieldName] = [];
    }
    grouped[field.fieldName].push(field);
  }

  // Iterate using Object.entries
  Object.entries(grouped).forEach(([fieldName, instances]) => {
    lines.push(`### \`${fieldName}\``);
    lines.push(`**Used in:** ${instances.length} location(s)`);
    lines.push('');
    for (const instance of instances) {
      lines.push(`- ${path.relative(clientRoot, instance.path)}`);
      lines.push(`  Context: ${instance.context}`);
    }
    lines.push('');
  });

  lines.push('## Instructions');
  lines.push('');
  lines.push('1. Fill in the missing fields in client-intake.json');
  lines.push('2. Re-run the scaffold script to update the project');
  lines.push('3. Search for TODO comments in the codebase to verify all placeholders are resolved');
  lines.push('');

  fs.writeFileSync(path.join(clientRoot, 'MISSING_DATA.md'), lines.join('\n'), 'utf-8');
}

function updateProjectMetadata(clientRoot: string, intake: ClientIntake) {
  // Update package.json
  const packageJsonPath = path.join(clientRoot, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    pkg.name = intake.vercel.project_name || intake.client_slug;
    pkg.version = '1.0.0';
    pkg.description = `Website for ${intake.practice.name}`;
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2), 'utf-8');
  }

  // Create README
  const readme = [
    `# ${intake.practice.name}`,
    '',
    `Scaffolded from **${intake.template.toUpperCase()}** template`,
    `Date: ${new Date().toISOString().split('T')[0]}`,
    '',
    '## Development',
    '',
    '```bash',
    'npm install',
    'npm run dev',
    '```',
    '',
    '## Deployment',
    '',
    '```bash',
    'vercel link',
    'vercel deploy',
    '```',
    '',
    '## Template Features',
    '',
    intake.template === 't1' ? '- **T1 Press**: Big graphic editorial design with print-inspired aesthetics' :
    intake.template === 't2' ? '- **T2 Precision**: High-tech motion design with precision focus' :
    intake.template === 't4' ? '- **T4 Atelier**: After-dark couture design with espresso-and-champagne luxury' :
    intake.template === 't5' ? '- **T5 Marigold**: Main-street retro design with warm, family-friendly charm' :
    '- **T3 Haven**: Mindful, therapeutic design with comfort emphasis',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(clientRoot, 'README.md'), readme, 'utf-8');
}

// ═══════════════════════════════════════════════════════════════════════
// RUN
// ═══════════════════════════════════════════════════════════════════════

main().catch((error) => {
  console.error('\n❌ ERROR:', error.message);
  process.exit(1);
});
