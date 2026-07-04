export type UserLifeStage =
  | "school-kid"
  | "class-12"
  | "college"
  | "dropout"
  | "job-seeker"
  | "interview-prep"
  | "employed";

export type CountryCode = "IN" | "US" | "GB" | "CA" | "AU" | "SG" | "AE" | "DE" | "FR" | "NL" | "SE" | "NZ" | "ZA" | "OTHER";

export type Currency = "INR" | "USD" | "EUR" | "GBP" | "AUD" | "CAD" | "SGD" | "AED";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  lifeStage: UserLifeStage;
  country: CountryCode;
  currency: Currency;
  createdAt: string;
};

export type AssessmentAnswers = {
  favoriteSubjects: string[];
  interestArea: string;
  studyStamina: "high" | "medium" | "low";
  primaryGoal: string;
  examComfort: "high" | "medium" | "low";
  educationBudget: "low" | "medium" | "high";
  locationPreference: string;
  currentClass?: "8" | "9" | "10" | "11" | "12";
  learningStyle?: string;
  familySupport?: string;
  timeAvailable?: string;
  confidenceLevel?: string;
  workEnvironment?: string;
  degreeField?: string;
  graduationTimeline?: string;
  internshipStatus?: string;
  gapDuration?: string;
  skillsBuilt?: string;
  yearsExperience?: string;
  targetIndustry?: string;
  resumeStatus?: string;
  interviewTimeline?: string;
  interviewType?: string;
  currentRole?: string;
  switchMotivation?: string;
  upskillArea?: string;
};

export type CareerPath = {
  id: string;
  name: string;
  stream: string;
  fitScore: number;
  pros: string[];
  cons: string[];
  earningRange: string;
  effortLevel: "High" | "Medium" | "Low";
  marketDemand: "High" | "Medium" | "Low";
  timeline: string;
  nextSteps: string[];
};

export type AssessmentResult = {
  answers: AssessmentAnswers;
  paths: CareerPath[];
  topStream: string;
  lifeStage: UserLifeStage;
  generatedAt: string;
};

export type SubscriptionPlan = {
  id: "free" | "student" | "premium";
  name: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
};
