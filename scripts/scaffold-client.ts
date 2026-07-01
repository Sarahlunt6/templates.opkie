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
  template: 't1' | 't2' | 't3';
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

const PLACEHOLDER_MAP = {
  'Summit Dental Group': 'practice.name',
  'Dr. Michael Roberts, DDS': 'doctor.name',
  'Dr. Roberts': 'doctor.name', // Handle shortened versions
  'Lead Cosmetic Dentist & Practice Owner': 'doctor.title',
  '(801) 555-0123': 'practice.phone',
  'tel:+18015550123': 'practice.phone_link',
  '1250 Mountain View Drive, Suite 200': 'practice.address.street',
  'Salt Lake City': 'practice.address.city',
  'UT': 'practice.address.state',
  'https://booking.example.com/summit-dental': 'booking_link',
  '$335': 'membership.individual_price',
  '$615': 'membership.couple_price',
  '$965': 'membership.family_price',
  '$299': 'membership.no_insurance_savings_plan_price',
  '5.0': 'stats.google_rating',
  '5,000+': 'stats.patients_served',
  '98%': 'stats.satisfaction_rate',
};

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

  // 6. Update brand colors if provided
  if (intakeData.brand.accent_color) {
    console.log('🎨 Applying brand colors...');
    updateBrandColors(clientRoot, intakeData.brand.accent_color);
  }

  // 7. Remove placeholder testimonials
  console.log('💬 Removing placeholder testimonials...');
  removeTestimonials(clientRoot);

  // 8. Generate MISSING_DATA.md
  if (missingFields.length > 0) {
    console.log(`⚠️  Generating MISSING_DATA.md (${missingFields.length} fields)...`);
    generateMissingDataReport(clientRoot, missingFields, intakeData);
  }

  // 9. Update project metadata
  console.log('📝 Updating project metadata...');
  updateProjectMetadata(clientRoot, intakeData);

  // 10. Initialize git
  console.log('🌿 Initializing git repository...');
  execSync('git init', { cwd: clientRoot, stdio: 'inherit' });
  execSync('git add .', { cwd: clientRoot, stdio: 'inherit' });
  execSync(`git commit -m "Initial scaffold from ${intakeData.template.toUpperCase()} template for ${intakeData.practice.name}"`, {
    cwd: clientRoot,
    stdio: 'inherit'
  });

  // 11. Verify build
  console.log('\n🔨 Installing dependencies and verifying build...');
  try {
    execSync('npm install', { cwd: clientRoot, stdio: 'inherit' });
    execSync('npm run build', { cwd: clientRoot, stdio: 'inherit' });
    console.log('\n✅ Build successful!');
  } catch (error) {
    console.error('\n❌ Build failed. Please review errors above.');
    throw error;
  }

  // 12. Final summary
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

  // Generate Google Maps embed URL
  const mapsQuery = encodeURIComponent(`${intake.practice.address.street}, ${intake.practice.address.city}, ${intake.practice.address.state} ${intake.practice.address.zip}`);
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${mapsQuery}`;

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

  const masterDataContent = `import type {
  MasterDentalPracticeSchema,
  ReviewData,
  BeforeAfterCase,
} from "@/types/dentist";

export const clientMasterData: MasterDentalPracticeSchema = {
  globalPracticeName: "${intake.practice.name}",
  practiceNiche: "dental",
  brandingLogoUrl: "${intake.brand.logo_path || '/images/logo-placeholder.svg'}",
  onlineBookingUrl: "${intake.booking_link}",

  locations: [
    {
      id: "loc-001",
      officeLabel: "Main Office",
      practiceNameGBP: "${intake.practice.name}",
      primaryCategoryGBP: "Dentist",
      secondaryCategoriesGBP: [
        "Cosmetic Dentist",
        "Emergency Dental Service",
        "Teeth Whitening Service",
        "Dental Implants Provider",
      ],
      addressGBP: "${intake.practice.address.street}",
      cityServed: "${intake.practice.address.city}",
      stateServed: "${intake.practice.address.state}",
      phoneGBP: "${intake.practice.phone}",
      googleMapsEmbedUrl: "${googleMapsEmbedUrl}",
      hoursOfOperation: ${JSON.stringify(hoursOfOperation, null, 8).replace(/"([^"]+)":/g, '$1:')},
      localizedNeighborhoods: [
        // TODO: Add local neighborhood names for ${intake.practice.address.city}
      ],
    },
  ],

  doctors: [
    {
      name: "${intake.doctor.name}",
      role: "${intake.doctor.title}",
      credentials: ${JSON.stringify(credentials, null, 8)},
      biography: "${intake.doctor.bio_short || 'Dedicated to providing exceptional dental care to our community.'}",
      portraitUrl: "/images/team/doctor-portrait.png",
    },
  ],

  theme: {
    primaryBrandHex: "${intake.brand.accent_color || '#0f766e'}",
    secondaryAccentHex: "#38bdf8",
    textMainHex: "#1e293b",
    bgCanvasHex: "#ffffff",
  },

  trustSignals: {
    insuranceAcceptedText:
      "We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, and United Healthcare. Contact us to verify your coverage.",
    membershipPlanSummary:
      "No insurance? Join our ${intake.practice.name} Savings Plan for $${intake.membership.no_insurance_savings_plan_price || 299}/year and receive 2 free cleanings, exams, and 20% off all treatments.",
    hasSameDayEmergency: true,
    hasSedationAnxietyCare: true,
  },
};

export const sampleReviews: ReviewData[] = [
  // TODO: Replace with real client testimonials — do not launch with placeholder reviews
  // Remove this comment and add actual verified patient reviews
];

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

  // Track missing neighborhoods
  missingFields.push({
    path: masterDataPath,
    fieldName: 'localizedNeighborhoods',
    context: 'Local neighborhood names for SEO and local relevance'
  });
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

    // Track missing data
    if (!intake.stats.google_rating) {
      missingFields.push({
        path: file,
        fieldName: 'stats.google_rating',
        context: 'Hero stat bar rating display'
      });
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

function removeTestimonials(clientRoot: string) {
  const masterDataPath = path.join(clientRoot, 'data', 'master.ts');
  if (!fs.existsSync(masterDataPath)) return;

  let content = fs.readFileSync(masterDataPath, 'utf-8');

  // Replace sampleReviews array with generic placeholders (keep structure intact for templates)
  content = content.replace(
    /export const sampleReviews: ReviewData\[\] = \[[\s\S]*?\];/,
    `export const sampleReviews: ReviewData[] = [
  // TODO: Replace with real client testimonials — do not launch with placeholder reviews
  {
    id: "placeholder-001",
    reviewerName: "[Patient Name]",
    rating: 5,
    reviewText: "Add real patient testimonial here. This is a placeholder review that should be replaced with actual verified patient feedback before launch.",
    procedureCategory: "General Dentistry",
    verificationBadge: "google",
    datePosted: new Date().toISOString().split('T')[0],
    isVerifiedPatient: true,
  },
  {
    id: "placeholder-002",
    reviewerName: "[Patient Name]",
    rating: 5,
    reviewText: "Add real patient testimonial here. This is a placeholder review that should be replaced with actual verified patient feedback before launch.",
    procedureCategory: "Cosmetic Dentistry",
    verificationBadge: "facebook",
    datePosted: new Date().toISOString().split('T')[0],
    isVerifiedPatient: true,
  },
  {
    id: "placeholder-003",
    reviewerName: "[Patient Name]",
    rating: 5,
    reviewText: "Add real patient testimonial here. This is a placeholder review that should be replaced with actual verified patient feedback before launch.",
    procedureCategory: "Dental Implants",
    verificationBadge: "google",
    datePosted: new Date().toISOString().split('T')[0],
    isVerifiedPatient: true,
  },
];`
  );

  fs.writeFileSync(masterDataPath, content, 'utf-8');
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
    intake.template === 't1' ? '- **T1 Prestige Leader**: Premium editorial design with luxury aesthetics' :
    intake.template === 't2' ? '- **T2 Clinical Innovator**: High-tech motion design with precision focus' :
    '- **T3 Spatial Sanctuary**: Mindful, therapeutic design with comfort emphasis',
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
