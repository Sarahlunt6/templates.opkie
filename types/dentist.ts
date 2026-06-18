/**
 * Dental Template Hub - Master Data Schema
 * Complete interface system for multi-location dental practice configurations
 */

export interface LocationNAP {
  id: string;
  officeLabel: string;
  practiceNameGBP: string;
  primaryCategoryGBP: string;
  secondaryCategoriesGBP: string[];
  addressGBP: string;
  cityServed: string;
  stateServed: string;
  phoneGBP: string;
  googleMapsEmbedUrl: string;
  hoursOfOperation: { dayRange: string; structuralHours: string }[];
  localizedNeighborhoods: string[];
}

export interface DoctorProfile {
  name: string;
  role: string;
  credentials: string[];
  biography: string;
  portraitUrl: string;
}

export interface PracticeThemeOverrides {
  primaryBrandHex: string;
  secondaryAccentHex: string;
  textMainHex: string;
  bgCanvasHex: string;
}

export interface TrustSignals {
  insuranceAcceptedText: string;
  membershipPlanSummary?: string;
  hasSameDayEmergency: boolean;
  hasSedationAnxietyCare: boolean;
}

export interface MasterDentalPracticeSchema {
  globalPracticeName: string;
  brandingLogoUrl: string;
  onlineBookingUrl: string | "none";
  locations: LocationNAP[];
  doctors: DoctorProfile[];
  theme: PracticeThemeOverrides;
  trustSignals: TrustSignals;
}

export interface ReviewData {
  id: string;
  reviewerName: string;
  rating: number;
  reviewText: string;
  procedureCategory: string;
  verificationBadge: "google" | "facebook" | "yelp" | "healthgrades";
  datePosted: string;
  isVerifiedPatient: boolean;
}

export interface BeforeAfterCase {
  id: string;
  beforeUrl: string;
  afterUrl: string;
  procedureType: string;
  altTag: string;
}
