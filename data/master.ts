import type {
  MasterDentalPracticeSchema,
  ReviewData,
  BeforeAfterCase,
} from "@/types/dentist";

export const clientMasterData: MasterDentalPracticeSchema = {
  globalPracticeName: "Summit Dental Group",
  brandingLogoUrl: "/images/logo-placeholder.svg",
  onlineBookingUrl: "https://booking.example.com/summit-dental",

  locations: [
    {
      id: "loc-001",
      officeLabel: "Main Office",
      practiceNameGBP: "Summit Dental Group",
      primaryCategoryGBP: "Dentist",
      secondaryCategoriesGBP: [
        "Cosmetic Dentist",
        "Emergency Dental Service",
        "Teeth Whitening Service",
        "Dental Implants Provider",
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
      practiceNameGBP: "Summit Dental Group - Ogden",
      primaryCategoryGBP: "Dentist",
      secondaryCategoriesGBP: [
        "Family Dentist",
        "Pediatric Dental Care",
        "Orthodontics",
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
      name: "Dr. Michael Roberts, DDS",
      role: "Lead Cosmetic Dentist & Practice Owner",
      credentials: [
        "Doctor of Dental Surgery, University of Utah",
        "American Academy of Cosmetic Dentistry Fellow",
        "Invisalign Diamond Provider",
      ],
      biography:
        "With over 15 years of experience in cosmetic and restorative dentistry, Dr. Roberts has transformed thousands of smiles across the Wasatch Front. His patient-first philosophy combines cutting-edge technology with compassionate care.",
      portraitUrl: "/images/doctors/dr-roberts-placeholder.jpg",
    },
    {
      name: "Dr. James Chen, DMD",
      role: "General & Family Dentist",
      credentials: [
        "Doctor of Dental Medicine, UNLV",
        "American Dental Association Member",
        "Certified in Pediatric Sedation Dentistry",
      ],
      biography:
        "Dr. Chen specializes in creating comfortable dental experiences for patients of all ages. His gentle approach and expertise in anxiety-free dentistry make him a favorite among families and nervous patients alike.",
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
      "We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, and United Healthcare. Contact us to verify your coverage.",
    membershipPlanSummary:
      "No insurance? Join our Summit Savings Plan for $299/year and receive 2 free cleanings, exams, and 20% off all treatments.",
    hasSameDayEmergency: true,
    hasSedationAnxietyCare: true,
  },
};

export const sampleReviews: ReviewData[] = [
  {
    id: "rev-001",
    reviewerName: "Jennifer M.",
    rating: 5,
    reviewText:
      "Dr. Mitchell completely transformed my smile with porcelain veneers. The entire process was comfortable and the results exceeded my expectations. I finally feel confident smiling in photos!",
    procedureCategory: "Cosmetic Veneers",
    verificationBadge: "google",
    datePosted: "2024-11-15",
    isVerifiedPatient: true,
  },
  {
    id: "rev-002",
    reviewerName: "Michael R.",
    rating: 5,
    reviewText:
      "Had a dental emergency on a Saturday and they got me in within an hour. The team was professional, caring, and resolved my pain immediately. Cannot recommend them enough.",
    procedureCategory: "Emergency Care",
    verificationBadge: "google",
    datePosted: "2024-10-28",
    isVerifiedPatient: true,
  },
  {
    id: "rev-003",
    reviewerName: "Amanda S.",
    rating: 5,
    reviewText:
      "My kids actually look forward to their dental visits now! Dr. Chen is amazing with children and makes the whole experience fun and stress-free for the entire family.",
    procedureCategory: "Family Dentistry",
    verificationBadge: "facebook",
    datePosted: "2024-11-02",
    isVerifiedPatient: true,
  },
  {
    id: "rev-004",
    reviewerName: "David L.",
    rating: 5,
    reviewText:
      "The Invisalign treatment here was seamless. Regular check-ins, clear communication, and my teeth are now perfectly aligned. Worth every penny.",
    procedureCategory: "Invisalign",
    verificationBadge: "google",
    datePosted: "2024-09-20",
    isVerifiedPatient: true,
  },
  {
    id: "rev-005",
    reviewerName: "Patricia H.",
    rating: 5,
    reviewText:
      "I was terrified of dentists for 20 years. The sedation options here changed everything. I finally got the care I needed without any anxiety. Life-changing.",
    procedureCategory: "Sedation Dentistry",
    verificationBadge: "healthgrades",
    datePosted: "2024-11-08",
    isVerifiedPatient: true,
  },
  {
    id: "rev-006",
    reviewerName: "Robert K.",
    rating: 5,
    reviewText:
      "My dental implant looks and feels completely natural. Dr. Mitchell's attention to detail is remarkable. Three months later and I forget it's not my original tooth.",
    procedureCategory: "Dental Implants",
    verificationBadge: "yelp",
    datePosted: "2024-10-12",
    isVerifiedPatient: true,
  },
];

export const sampleBeforeAfterCases: BeforeAfterCase[] = [
  {
    id: "case-001",
    beforeUrl: "/images/cases/veneers-before-placeholder.jpg",
    afterUrl: "/images/cases/veneers-after-placeholder.jpg",
    procedureType: "Porcelain Veneers",
    altTag: "Porcelain veneers smile transformation",
  },
  {
    id: "case-002",
    beforeUrl: "/images/cases/whitening-before-placeholder.jpg",
    afterUrl: "/images/cases/whitening-after-placeholder.jpg",
    procedureType: "Professional Whitening",
    altTag: "Professional teeth whitening results",
  },
  {
    id: "case-003",
    beforeUrl: "/images/cases/invisalign-before-placeholder.jpg",
    afterUrl: "/images/cases/invisalign-after-placeholder.jpg",
    procedureType: "Invisalign Treatment",
    altTag: "Invisalign orthodontic alignment results",
  },
];

export default clientMasterData;
