import type {
  MasterDentalPracticeSchema,
  ReviewData,
  BeforeAfterCase,
} from "@/types/dentist";

export const clientMasterDataOrtho: MasterDentalPracticeSchema = {
  globalPracticeName: "Summit Orthodontics",
  brandingLogoUrl: "/images/logo-placeholder.svg",
  onlineBookingUrl: "https://booking.example.com/summit-ortho",

  locations: [
    {
      id: "loc-001",
      officeLabel: "Main Office",
      practiceNameGBP: "Summit Orthodontics",
      primaryCategoryGBP: "Orthodontist",
      secondaryCategoriesGBP: [
        "Braces Specialist",
        "Invisalign Provider",
        "Clear Aligners",
        "Pediatric Orthodontics",
      ],
      addressGBP: "1250 Mountain View Drive, Suite 200",
      cityServed: "Salt Lake City",
      stateServed: "UT",
      phoneGBP: "(801) 555-0123",
      googleMapsEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.0!2d-111.89!3d40.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzM2LjAiTiAxMTHCsDUzJzI0LjAiVw!5e0!3m2!1sen!2sus!4v1234567890",
      hoursOfOperation: [
        { dayRange: "Monday - Thursday", structuralHours: "8:00 AM - 5:00 PM" },
        { dayRange: "Friday", structuralHours: "8:00 AM - 2:00 PM" },
        { dayRange: "Saturday - Sunday", structuralHours: "Closed" },
      ],
      localizedNeighborhoods: [
        "Sugar House",
        "The Avenues",
        "Capitol Hill",
        "Downtown SLC",
        "University of Utah Area",
      ],
    },
    {
      id: "loc-002",
      officeLabel: "Ogden Office",
      practiceNameGBP: "Summit Orthodontics - Ogden",
      primaryCategoryGBP: "Orthodontist",
      secondaryCategoriesGBP: [
        "Teen Braces",
        "Adult Orthodontics",
        "Retainers & Maintenance",
      ],
      addressGBP: "4500 Harrison Boulevard, Suite 110",
      cityServed: "Ogden",
      stateServed: "UT",
      phoneGBP: "(801) 555-0456",
      googleMapsEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.0!2d-111.97!3d41.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDEzJzEyLjAiTiAxMTHCsDU4JzEyLjAiVw!5e0!3m2!1sen!2sus!4v1234567890",
      hoursOfOperation: [
        { dayRange: "Monday - Friday", structuralHours: "9:00 AM - 6:00 PM" },
        { dayRange: "Saturday", structuralHours: "9:00 AM - 1:00 PM" },
        { dayRange: "Sunday", structuralHours: "Closed" },
      ],
      localizedNeighborhoods: [
        "Weber State University",
        "Historic 25th Street",
        "South Ogden",
        "North Ogden",
      ],
    },
  ],

  doctors: [
    {
      name: "Dr. Michael Roberts, DMD, MS",
      role: "Board-Certified Orthodontist & Practice Owner",
      credentials: [
        "Doctor of Dental Medicine, University of Utah",
        "Master of Science in Orthodontics",
        "American Board of Orthodontics Certified",
        "Invisalign Diamond Plus Provider",
      ],
      biography:
        "With over 15 years of experience in orthodontics, Dr. Roberts has helped thousands of patients achieve their perfect smile. His expertise in both traditional braces and clear aligner therapy ensures every patient receives personalized treatment for optimal results.",
      portraitUrl: "/images/doctors/dr-roberts-placeholder.jpg",
    },
    {
      name: "Dr. Sarah Chen, DDS, MS",
      role: "Orthodontist & Pediatric Specialist",
      credentials: [
        "Doctor of Dental Surgery, UCLA",
        "Orthodontic Residency, USC",
        "American Association of Orthodontists Member",
        "Certified in Early Intervention Orthodontics",
      ],
      biography:
        "Dr. Chen specializes in creating confident smiles for patients of all ages, with particular expertise in early interceptive treatment and teen orthodontics. Her gentle approach makes every visit comfortable and even fun.",
      portraitUrl: "/images/doctors/dr-chen-placeholder.jpg",
    },
  ],

  theme: {
    primaryBrandHex: "#0f766e",
    secondaryAccentHex: "#38bdf8",
    textMainHex: "#1e293b",
    bgCanvasHex: "#ffffff",
  },

  trustSignals: {
    insuranceAcceptedText:
      "We accept most major dental and orthodontic insurance plans including Delta Dental, Cigna, Aetna, and United Healthcare. Contact us to verify your coverage.",
    membershipPlanSummary:
      "Flexible payment plans available with 0% financing for up to 24 months. No insurance required to start your smile journey.",
    hasSameDayEmergency: true,
    hasSedationAnxietyCare: false,
  },
};

export const sampleReviewsOrtho: ReviewData[] = [
  {
    id: "rev-001",
    reviewerName: "Jennifer M.",
    rating: 5,
    reviewText:
      "My daughter's braces journey was incredible! Dr. Roberts made every adjustment comfortable, and the results are stunning. Her confidence has soared since getting her braces off.",
    procedureCategory: "Teen Braces",
    verificationBadge: "google",
    datePosted: "2024-11-15",
    isVerifiedPatient: true,
  },
  {
    id: "rev-002",
    reviewerName: "Michael R.",
    rating: 5,
    reviewText:
      "Started Invisalign at 35 and couldn't be happier. The clear aligners fit my lifestyle perfectly, and my teeth are now perfectly straight. Wish I'd done this years ago!",
    procedureCategory: "Invisalign",
    verificationBadge: "google",
    datePosted: "2024-10-28",
    isVerifiedPatient: true,
  },
  {
    id: "rev-003",
    reviewerName: "Amanda S.",
    rating: 5,
    reviewText:
      "Dr. Chen caught my son's bite issues early with Phase 1 treatment. Now at 12, he's on track for a much shorter braces time. So grateful for her expertise!",
    procedureCategory: "Early Intervention",
    verificationBadge: "facebook",
    datePosted: "2024-11-02",
    isVerifiedPatient: true,
  },
  {
    id: "rev-004",
    reviewerName: "David L.",
    rating: 5,
    reviewText:
      "The team here is amazing with nervous patients. My ceramic braces blend in perfectly, and the monthly visits are always quick and painless. Highly recommend!",
    procedureCategory: "Ceramic Braces",
    verificationBadge: "google",
    datePosted: "2024-09-20",
    isVerifiedPatient: true,
  },
  {
    id: "rev-005",
    reviewerName: "Patricia H.",
    rating: 5,
    reviewText:
      "After years of being self-conscious about my crowded teeth, I finally took the plunge. 18 months later, I have the smile I always dreamed of. The payment plan made it affordable too.",
    procedureCategory: "Adult Braces",
    verificationBadge: "healthgrades",
    datePosted: "2024-11-08",
    isVerifiedPatient: true,
  },
  {
    id: "rev-006",
    reviewerName: "Robert K.",
    rating: 5,
    reviewText:
      "Both my kids are patients here, and the experience has been fantastic. The office is modern, the staff is friendly, and the results speak for themselves.",
    procedureCategory: "Family Orthodontics",
    verificationBadge: "yelp",
    datePosted: "2024-10-12",
    isVerifiedPatient: true,
  },
];

export const sampleBeforeAfterCasesOrtho: BeforeAfterCase[] = [
  {
    id: "case-001",
    beforeUrl: "/images/cases/smile-before.png",
    afterUrl: "/images/cases/smile-after.png",
    procedureType: "Traditional Braces",
    altTag: "Traditional braces smile transformation",
  },
  {
    id: "case-002",
    beforeUrl: "/images/cases/smile-before.png",
    afterUrl: "/images/cases/smile-after.png",
    procedureType: "Invisalign Clear Aligners",
    altTag: "Invisalign clear aligner results",
  },
  {
    id: "case-003",
    beforeUrl: "/images/cases/smile-before.png",
    afterUrl: "/images/cases/smile-after.png",
    procedureType: "Ceramic Braces",
    altTag: "Ceramic braces orthodontic results",
  },
];

export default clientMasterDataOrtho;
