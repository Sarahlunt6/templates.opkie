import type {
  MasterDentalPracticeSchema,
  ReviewData,
  BeforeAfterCase,
} from "@/types/dentist";

export const clientMasterData: MasterDentalPracticeSchema = {
  globalPracticeName: "Summit Dental Group",
  practiceNiche: "dental",
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
        "Dr. Chen specializes in creating comfortable dental experiences for patients of all ages. A gentle approach and expertise in anxiety-free dentistry make Dr. Chen a favorite among families and nervous patients alike.",
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
      "After 10 years of hiding my smile, Dr. Roberts gave me 8 porcelain veneers that look completely natural. The entire process took just two appointments over 3 weeks. I've already booked two photoshoots—something I never would have done before.",
    procedureCategory: "Porcelain Veneers",
    verificationBadge: "google",
    datePosted: "2024-11-15",
    isVerifiedPatient: true,
  },
  {
    id: "rev-002",
    reviewerName: "Michael R.",
    rating: 5,
    reviewText:
      "Cracked my molar on a Saturday morning eating breakfast. Called at 9am, was in the chair by 10:30. Dr. Roberts saved the tooth with a same-day crown using their CEREC machine. No temporary, no second visit. Back to normal by dinner.",
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
      "My 7-year-old used to cry in the parking lot before dental visits. Dr. Roberts spent 15 minutes just talking to him about dinosaurs before even looking at his teeth. Now my son asks when his next appointment is. That's worth more than any treatment.",
    procedureCategory: "Pediatric Dentistry",
    verificationBadge: "facebook",
    datePosted: "2024-11-02",
    isVerifiedPatient: true,
  },
  {
    id: "rev-004",
    reviewerName: "David L.",
    rating: 5,
    reviewText:
      "Finished my Invisalign treatment in 14 months—3 months faster than originally estimated. Dr. Roberts checked my progress every 6 weeks and made adjustments along the way. My wife says it took 10 years off my face.",
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
      "I avoided dentists for 22 years after a traumatic experience as a teenager. The sedation option here let me get a deep cleaning, 3 fillings, and a crown—all in one visit. I woke up and it was done. Finally caught up on two decades of care.",
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
      "Lost my front tooth in a biking accident. Dr. Roberts placed the implant and attached the crown in a single procedure using guided surgery. 4 months later, even my dentist friends can't tell which tooth is the implant.",
    procedureCategory: "Dental Implants",
    verificationBadge: "yelp",
    datePosted: "2024-10-12",
    isVerifiedPatient: true,
  },
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
