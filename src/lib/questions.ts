import type { UserLifeStage } from "./types";

export type QuestionOption = {
  value: string;
  label: string;
};

export type Question = {
  id: keyof import("./types").AssessmentAnswers | string;
  title: string;
  subtitle?: string;
  type: "single" | "multi";
  options: QuestionOption[];
  stages?: UserLifeStage[];
};

const UNIVERSAL_QUESTIONS: Question[] = [
  {
    id: "favoriteSubjects",
    title: "Which subjects or topics do you enjoy most?",
    subtitle: "Pick up to 4 that feel natural to you.",
    type: "multi",
    options: [
      { value: "math", label: "Mathematics" },
      { value: "physics", label: "Physics / Science" },
      { value: "chemistry", label: "Chemistry" },
      { value: "biology", label: "Biology" },
      { value: "english", label: "English / Communication" },
      { value: "accounts", label: "Accounts / Commerce" },
      { value: "economics", label: "Economics / Business" },
      { value: "history", label: "History / Civics / Social" },
      { value: "computer", label: "Computer Science / IT" },
      { value: "arts", label: "Arts / Design / Creative" },
    ],
  },
  {
    id: "interestArea",
    title: "What kind of work excites you?",
    type: "single",
    options: [
      { value: "technology", label: "Technology & building things" },
      { value: "science-health", label: "Science, health & helping people" },
      { value: "business", label: "Business, finance & money" },
      { value: "creative", label: "Creative work & expression" },
      { value: "public-service", label: "Public service & leadership" },
      { value: "exploring", label: "Still exploring — not sure yet" },
    ],
  },
  {
    id: "learningStyle",
    title: "How do you learn best?",
    type: "single",
    options: [
      { value: "visual", label: "Videos, diagrams & visual examples" },
      { value: "reading", label: "Reading, notes & structured books" },
      { value: "practice", label: "Hands-on practice & projects" },
      { value: "discussion", label: "Group study & discussions" },
    ],
  },
  {
    id: "primaryGoal",
    title: "What matters most to you right now?",
    type: "single",
    options: [
      { value: "high-salary", label: "High earning potential" },
      { value: "stable-job", label: "Stable, respected job" },
      { value: "passion", label: "Doing work I genuinely love" },
      { value: "government", label: "Government / PSU career" },
      { value: "abroad", label: "Study or work abroad" },
      { value: "entrepreneur", label: "Start my own business someday" },
    ],
  },
  {
    id: "confidenceLevel",
    title: "How confident do you feel about your career direction?",
    type: "single",
    options: [
      { value: "high", label: "Very confident — just need a plan" },
      { value: "medium", label: "Somewhat — I have ideas but need clarity" },
      { value: "low", label: "Lost — I need strong guidance" },
    ],
  },
  {
    id: "familySupport",
    title: "How supportive is your family about career choices?",
    type: "single",
    options: [
      { value: "high", label: "Very supportive — open to my interests" },
      { value: "medium", label: "Supportive but prefer safe/stable paths" },
      { value: "low", label: "Strong opinions — I need convincing data" },
    ],
  },
  {
    id: "timeAvailable",
    title: "How much time can you invest weekly in career growth?",
    type: "single",
    options: [
      { value: "5plus", label: "5+ hours — I can grind consistently" },
      { value: "3-5", label: "3–5 hours — steady but balanced" },
      { value: "under3", label: "Under 3 hours — school/work comes first" },
    ],
  },
  {
    id: "workEnvironment",
    title: "Where do you see yourself working?",
    type: "single",
    options: [
      { value: "office", label: "Office / corporate team" },
      { value: "remote", label: "Remote / work from anywhere" },
      { value: "field", label: "Field work / on-site roles" },
      { value: "flexible", label: "Flexible — open to anything" },
    ],
  },
];

const SCHOOL_QUESTIONS: Question[] = [
  {
    id: "currentClass",
    title: "Which class are you in?",
    subtitle: "We tailor stream advice for your stage.",
    type: "single",
    stages: ["school-kid", "class-12"],
    options: [
      { value: "8", label: "Class 8" },
      { value: "9", label: "Class 9" },
      { value: "10", label: "Class 10 (choosing stream next)" },
      { value: "11", label: "Class 11 (stream chosen or confirming)" },
      { value: "12", label: "Class 12 (planning next step)" },
    ],
  },
  {
    id: "studyStamina",
    title: "How much study pressure can you handle consistently?",
    type: "single",
    stages: ["school-kid", "class-12"],
    options: [
      { value: "high", label: "High — I can grind for competitive exams" },
      { value: "medium", label: "Medium — steady effort, not extreme" },
      { value: "low", label: "Low — I prefer balanced school life" },
    ],
  },
  {
    id: "examComfort",
    title: "How do you feel about tough entrance exams?",
    subtitle: "JEE, NEET, CUET, CLAT, etc.",
    type: "single",
    stages: ["school-kid", "class-12"],
    options: [
      { value: "high", label: "Bring it on — I like competition" },
      { value: "medium", label: "Okay if the reward is worth it" },
      { value: "low", label: "I'd rather avoid ultra-competitive routes" },
    ],
  },
  {
    id: "educationBudget",
    title: "What's your family's education budget comfort?",
    subtitle: "Honest answer helps us suggest realistic paths.",
    type: "single",
    stages: ["school-kid", "class-12", "college"],
    options: [
      { value: "low", label: "Low — government colleges / scholarships preferred" },
      { value: "medium", label: "Medium — decent private college is okay" },
      { value: "high", label: "High — premium institutes are an option" },
    ],
  },
  {
    id: "locationPreference",
    title: "Where do you see yourself studying or working?",
    type: "single",
    stages: ["school-kid", "class-12", "college", "dropout"],
    options: [
      { value: "metro", label: "Metro cities (Delhi, Mumbai, Bangalore…)" },
      { value: "anywhere", label: "Any good city in India / abroad" },
      { value: "hometown", label: "Prefer staying close to home" },
    ],
  },
];

const COLLEGE_QUESTIONS: Question[] = [
  {
    id: "degreeField",
    title: "What are you studying (or planning to study)?",
    type: "single",
    stages: ["college"],
    options: [
      { value: "engineering", label: "Engineering / Technology" },
      { value: "commerce", label: "Commerce / BBA / Finance" },
      { value: "science", label: "Pure Science / Research" },
      { value: "medical-allied", label: "Medical / Allied Health" },
      { value: "arts-humanities", label: "Arts / Humanities / Law" },
      { value: "design-media", label: "Design / Media / Creative" },
    ],
  },
  {
    id: "graduationTimeline",
    title: "When do you graduate (or plan to)?",
    type: "single",
    stages: ["college"],
    options: [
      { value: "this-year", label: "This year — placement season now" },
      { value: "1-2-years", label: "In 1–2 years" },
      { value: "2plus-years", label: "More than 2 years away" },
    ],
  },
  {
    id: "internshipStatus",
    title: "What's your internship / project experience?",
    type: "single",
    stages: ["college", "dropout"],
    options: [
      { value: "done", label: "Done at least one relevant internship/project" },
      { value: "partial", label: "Some projects but no formal internship" },
      { value: "none", label: "Not yet — need a starting plan" },
    ],
  },
];

const DROPOUT_QUESTIONS: Question[] = [
  {
    id: "gapDuration",
    title: "How long have you been away from formal education?",
    type: "single",
    stages: ["dropout"],
    options: [
      { value: "under-1", label: "Less than 1 year" },
      { value: "1-2", label: "1–2 years" },
      { value: "2plus", label: "More than 2 years" },
    ],
  },
  {
    id: "skillsBuilt",
    title: "What skills have you built during your gap?",
    type: "single",
    stages: ["dropout", "job-seeker"],
    options: [
      { value: "tech", label: "Coding / tech / digital skills" },
      { value: "business", label: "Sales / business / freelancing" },
      { value: "creative", label: "Design / content / creative work" },
      { value: "minimal", label: "Still building — need direction" },
    ],
  },
];

const JOB_SEEKER_QUESTIONS: Question[] = [
  {
    id: "yearsExperience",
    title: "How much work experience do you have?",
    type: "single",
    stages: ["job-seeker", "interview-prep", "employed"],
    options: [
      { value: "fresher", label: "Fresher / no full-time job yet" },
      { value: "0-2", label: "0–2 years" },
      { value: "2-5", label: "2–5 years" },
      { value: "5plus", label: "5+ years" },
    ],
  },
  {
    id: "targetIndustry",
    title: "Which industry are you targeting?",
    type: "single",
    stages: ["job-seeker", "interview-prep"],
    options: [
      { value: "it", label: "IT / Software / Product" },
      { value: "finance", label: "Finance / Banking / Consulting" },
      { value: "core", label: "Core engineering / manufacturing" },
      { value: "government", label: "Government / PSU" },
      { value: "startup", label: "Startups / generalist roles" },
    ],
  },
  {
    id: "resumeStatus",
    title: "How ready is your resume / profile?",
    type: "single",
    stages: ["job-seeker"],
    options: [
      { value: "strong", label: "Strong — getting some callbacks" },
      { value: "average", label: "Average — few responses" },
      { value: "weak", label: "Weak — barely any responses" },
    ],
  },
];

const INTERVIEW_QUESTIONS: Question[] = [
  {
    id: "interviewTimeline",
    title: "When is your interview?",
    type: "single",
    stages: ["interview-prep"],
    options: [
      { value: "week", label: "Within a week — urgent mode" },
      { value: "2-4-weeks", label: "2–4 weeks away" },
      { value: "1plus-month", label: "More than a month — steady prep" },
    ],
  },
  {
    id: "interviewType",
    title: "What type of interview is it?",
    type: "single",
    stages: ["interview-prep"],
    options: [
      { value: "campus", label: "Campus placement" },
      { value: "service", label: "Service company (TCS, Infosys, etc.)" },
      { value: "product", label: "Product / startup (DSA + system)" },
      { value: "government", label: "Government / PSU / bank exam interview" },
    ],
  },
];

const EMPLOYED_QUESTIONS: Question[] = [
  {
    id: "currentRole",
    title: "What best describes your current work?",
    type: "single",
    stages: ["employed"],
    options: [
      { value: "tech", label: "Tech / engineering role" },
      { value: "business", label: "Business / operations / finance" },
      { value: "creative", label: "Creative / marketing / content" },
      { value: "other", label: "Other professional role" },
    ],
  },
  {
    id: "switchMotivation",
    title: "What do you want most right now?",
    type: "single",
    stages: ["employed"],
    options: [
      { value: "salary", label: "Higher salary / better compensation" },
      { value: "switch", label: "Switch industry or role type" },
      { value: "promotion", label: "Promotion / leadership growth" },
      { value: "upskill", label: "Upskill in current role" },
    ],
  },
  {
    id: "upskillArea",
    title: "Which upskill area interests you?",
    type: "single",
    stages: ["employed", "college"],
    options: [
      { value: "technical", label: "Technical depth (coding, domain, certs)" },
      { value: "management", label: "Management / leadership" },
      { value: "communication", label: "Communication / sales / client-facing" },
      { value: "entrepreneurship", label: "Entrepreneurship / side business" },
    ],
  },
];

const ALL_QUESTIONS: Question[] = [
  ...SCHOOL_QUESTIONS,
  ...COLLEGE_QUESTIONS,
  ...DROPOUT_QUESTIONS,
  ...JOB_SEEKER_QUESTIONS,
  ...INTERVIEW_QUESTIONS,
  ...EMPLOYED_QUESTIONS,
  ...UNIVERSAL_QUESTIONS,
];

function questionAppliesToStage(question: Question, stage: UserLifeStage): boolean {
  if (!question.stages) return true;
  return question.stages.includes(stage);
}

export function getQuestionsForStage(stage: UserLifeStage): Question[] {
  const seen = new Set<string>();
  const ordered: Question[] = [];

  for (const question of ALL_QUESTIONS) {
    if (!questionAppliesToStage(question, stage)) continue;
    if (seen.has(question.id)) continue;
    seen.add(question.id);
    ordered.push(question);
  }

  return ordered;
}

export { STORAGE_KEY } from "./auth";
