export type Transmission = 'manual' | 'automatic' | 'both';

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  hours: number;
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  idealFor: string;
  features: string[];
  popular?: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  grade: 'DVSA Grade A' | 'DVSA Grade B' | 'Senior Coach';
  areas: string[];
  postcodes: string[];
  transmission: 'manual' | 'automatic' | 'both';
  car: string;
  hourlyRate: number;
  experienceYears: number;
  firstTimePassRate: number;
  avatarBg: string;
  avatarInitials: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  reviewerName: string;
  instructorName: string;
  city: string;
  testCentre: string;
  rating: number;
  date: string;
  minors: number;
  reviewText: string;
  courseType: string;
  transmission: 'manual' | 'automatic';
}

export interface AreaLocation {
  id: string;
  name: string;
  region: string;
  postcodePrefixes: string[];
  passRate: number;
  activeInstructors: number;
  testCentres: string[];
  description: string;
}

export interface TheoryQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  highwayCodeRef: string;
}

export interface Manoeuvre {
  id: string;
  name: string;
  dvsaCode: string;
  diagramSvg: string;
  keySteps: string[];
  examinerChecks: string[];
  commonFaults: string[];
}

export interface ShowMeTellMeQuestion {
  id: string;
  type: 'show-me' | 'tell-me';
  question: string;
  answer: string;
  whenAsked: 'While driving' | 'Before moving off';
  safetyTip: string;
}
