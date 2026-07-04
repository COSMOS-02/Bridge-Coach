import type { AssessmentAnswers, AssessmentResult, CareerPath, UserLifeStage } from "./types";

type PathTemplate = Omit<CareerPath, "fitScore"> & {
  score: (answers: AssessmentAnswers) => number;
};

const PATH_TEMPLATES: PathTemplate[] = [
  {
    id: "engineering-tech",
    name: "Engineering & Tech (PCM → B.Tech)",
    stream: "Science (PCM) + JEE / state engineering exams",
    score: (a) => {
      let s = 0;
      if (a.favoriteSubjects.includes("math")) s += 18;
      if (a.favoriteSubjects.includes("physics")) s += 14;
      if (a.favoriteSubjects.includes("computer")) s += 16;
      if (a.interestArea === "technology") s += 22;
      if (a.primaryGoal === "high-salary") s += 12;
      if (a.primaryGoal === "abroad") s += 8;
      if (a.examComfort === "high") s += 14;
      if (a.examComfort === "medium") s += 8;
      if (a.studyStamina === "high") s += 10;
      if (a.studyStamina === "medium") s += 5;
      if (a.educationBudget !== "low") s += 4;
      return s;
    },
    pros: [
      "Strong demand in IT, software, and core engineering across India",
      "Good salary growth — ₹6–12 LPA fresher in top roles, higher with skills",
      "Multiple entry routes: JEE, state CET, private universities",
      "Opens doors to startups, product companies, and remote work",
    ],
    cons: [
      "Highly competitive exams (JEE) need 1–2 years of focused prep",
      "4-year degree commitment before full-time earning",
      "Quality varies a lot between colleges — choose wisely",
    ],
    earningRange: "₹4–12 LPA (fresher) → ₹15–40+ LPA (mid-career in tech)",
    effortLevel: "High",
    marketDemand: "High",
    timeline: "4–6 years to first strong job (with consistent effort)",
    nextSteps: [
      "Choose PCM in Class 11 if not already enrolled",
      "Start JEE/board basics — NCERT is your foundation",
      "Explore coding via Python or web basics on weekends",
      "Shortlist 5–10 engineering colleges matching your budget",
    ],
  },
  {
    id: "medicine-health",
    name: "Medicine & Healthcare (PCB → MBBS / Allied Health)",
    stream: "Science (PCB) + NEET",
    score: (a) => {
      let s = 0;
      if (a.favoriteSubjects.includes("biology")) s += 20;
      if (a.favoriteSubjects.includes("chemistry")) s += 12;
      if (a.favoriteSubjects.includes("physics")) s += 6;
      if (a.interestArea === "science-health") s += 24;
      if (a.primaryGoal === "stable-job") s += 12;
      if (a.primaryGoal === "passion") s += 8;
      if (a.examComfort === "high") s += 12;
      if (a.examComfort === "medium") s += 6;
      if (a.studyStamina === "high") s += 12;
      if (a.educationBudget === "high") s += 6;
      return s;
    },
    pros: [
      "Respected, stable career with long-term demand",
      "Multiple paths: MBBS, BDS, B.Pharm, Nursing, Physiotherapy",
      "Strong job security in hospitals, clinics, and research",
      "Option to practice, specialize, or work abroad later",
    ],
    cons: [
      "NEET is extremely competitive — lakhs of aspirants",
      "Long training period (5.5+ years for MBBS)",
      "High stress and study load throughout the journey",
    ],
    earningRange: "₹5–15 LPA (early career) → ₹20–60+ LPA (specialist/private practice)",
    effortLevel: "High",
    marketDemand: "High",
    timeline: "5–8 years to established career",
    nextSteps: [
      "Choose PCB (or PCMB) in Class 11",
      "Begin NEET-focused study plan with NCERT Biology & Chemistry",
      "Research allied health degrees as backup (B.Pharm, BPT, Nursing)",
      "Talk to a doctor or medical student for reality check",
    ],
  },
  {
    id: "commerce-finance",
    name: "Commerce, CA & Finance (B.Com → CA / MBA / Banking)",
    stream: "Commerce with Maths (recommended) or without Maths",
    score: (a) => {
      let s = 0;
      if (a.favoriteSubjects.includes("accounts")) s += 18;
      if (a.favoriteSubjects.includes("economics")) s += 14;
      if (a.favoriteSubjects.includes("math")) s += 10;
      if (a.interestArea === "business") s += 22;
      if (a.primaryGoal === "high-salary") s += 10;
      if (a.primaryGoal === "stable-job") s += 10;
      if (a.primaryGoal === "entrepreneur") s += 12;
      if (a.examComfort === "medium") s += 8;
      if (a.examComfort === "low") s += 4;
      if (a.studyStamina !== "low") s += 6;
      return s;
    },
    pros: [
      "Clear path to CA, CS, CMA, banking, and corporate finance roles",
      "Less physically demanding than science competitive routes",
      "Strong earning in CA, investment banking, and finance leadership",
      "Good base for entrepreneurship and family business growth",
    ],
    cons: [
      "CA course is long and has low pass rates at each level",
      "Initial years can feel slow before qualifications pay off",
      "Commerce without Maths limits some B.Com / economics options",
    ],
    earningRange: "₹3–8 LPA (fresher) → ₹15–50+ LPA (CA / senior finance roles)",
    effortLevel: "Medium",
    marketDemand: "High",
    timeline: "3–6 years to strong finance career",
    nextSteps: [
      "Pick Commerce with Maths if your board allows and you like numbers",
      "Learn basics of accounting and GST through free YouTube/courses",
      "Explore CA Foundation timeline vs B.Com + MBA route",
      "Follow business news to build commercial awareness early",
    ],
  },
  {
    id: "law-governance",
    name: "Law & Governance (Humanities / Any → LLB / Civil Services)",
    stream: "Any stream → CLAT / BA LLB / UPSC path",
    score: (a) => {
      let s = 0;
      if (a.favoriteSubjects.includes("history")) s += 14;
      if (a.favoriteSubjects.includes("english")) s += 12;
      if (a.interestArea === "public-service") s += 24;
      if (a.primaryGoal === "government") s += 20;
      if (a.primaryGoal === "stable-job") s += 10;
      if (a.primaryGoal === "passion") s += 6;
      if (a.examComfort === "medium") s += 8;
      if (a.studyStamina === "high") s += 8;
      if (a.studyStamina === "medium") s += 6;
      return s;
    },
    pros: [
      "Prestigious careers in law, judiciary, policy, and administration",
      "Any stream can lead here — especially strong with humanities",
      "Government jobs offer stability, pension, and social impact",
      "Debate, writing, and reasoning skills compound over time",
    ],
    cons: [
      "UPSC and top law entrances require years of dedication",
      "Income starts modest unless you reach top tiers or corporate law",
      "Success depends heavily on communication and consistency",
    ],
    earningRange: "₹4–10 LPA (early) → ₹15–30+ LPA (corporate law / senior govt.)",
    effortLevel: "High",
    marketDemand: "Medium",
    timeline: "5–10 years for top government / elite law roles",
    nextSteps: [
      "Strengthen English, current affairs, and logical reasoning daily",
      "Explore BA LLB via CLAT or 3-year LLB after graduation",
      "Join debate club, MUN, or essay competitions in school",
      "Read one newspaper section every day — editorials matter",
    ],
  },
  {
    id: "creative-design",
    name: "Creative & Design (Any → Design / Media / UX)",
    stream: "Any stream — portfolio matters more than PCM/Commerce split",
    score: (a) => {
      let s = 0;
      if (a.favoriteSubjects.includes("arts")) s += 22;
      if (a.favoriteSubjects.includes("english")) s += 10;
      if (a.favoriteSubjects.includes("computer")) s += 8;
      if (a.interestArea === "creative") s += 24;
      if (a.primaryGoal === "passion") s += 16;
      if (a.examComfort === "low") s += 10;
      if (a.studyStamina === "low") s += 6;
      if (a.studyStamina === "medium") s += 4;
      if (a.primaryGoal === "entrepreneur") s += 6;
      return s;
    },
    pros: [
      "Growing demand in UX/UI, animation, content, and digital media",
      "Portfolio and skills often beat exam scores in hiring",
      "Flexible freelance and remote work opportunities",
      "Fulfilling if you love creating and storytelling",
    ],
    cons: [
      "Income can be uneven early in freelancing",
      "Fewer 'guaranteed' campus placements than engineering/commerce",
      "Need self-discipline to build projects outside school syllabus",
    ],
    earningRange: "₹3–8 LPA (fresher) → ₹12–30 LPA (senior UX / creative lead)",
    effortLevel: "Medium",
    marketDemand: "Medium",
    timeline: "3–5 years to establish creative career",
    nextSteps: [
      "Start a portfolio — Canva, Figma, or simple video edits",
      "Research NID, NIFT, or design diplomas that fit your budget",
      "Pick a stream you can manage while building side projects",
      "Follow 3 creators in your niche and study their journey",
    ],
  },
  {
    id: "diploma-vocational",
    name: "Diploma & Skill-First Route (Polytechnic / ITI → Job)",
    stream: "Science or Commerce → Diploma / certification → early employment",
    score: (a) => {
      let s = 0;
      if (a.educationBudget === "low") s += 18;
      if (a.locationPreference === "hometown") s += 12;
      if (a.examComfort === "low") s += 14;
      if (a.studyStamina === "low") s += 10;
      if (a.studyStamina === "medium") s += 6;
      if (a.primaryGoal === "stable-job") s += 12;
      if (a.interestArea === "technology") s += 10;
      if (a.favoriteSubjects.includes("computer")) s += 8;
      if (a.primaryGoal === "high-salary") s -= 4;
      return s;
    },
    pros: [
      "Lower cost and faster entry to employment (2–3 years)",
      "Practical skills valued in manufacturing, IT support, and trades",
      "Can lateral-enter B.Tech or upskill later while earning",
      "Good option when competitive exams aren't the right fit",
    ],
    cons: [
      "Starting salary usually lower than top degree paths",
      "Some ceiling without further degrees or certifications",
      "Less campus glamour — you must actively hunt opportunities",
    ],
    earningRange: "₹2.5–5 LPA (fresher) → ₹8–15 LPA (with experience + upskilling)",
    effortLevel: "Low",
    marketDemand: "Medium",
    timeline: "2–4 years to stable employment",
    nextSteps: [
      "Explore polytechnic diplomas in your state (CS, Mech, Electrical)",
      "Compare ITI trades with local industry demand",
      "Plan a certification path (AWS, networking, etc.) alongside diploma",
      "Visit a local employer or workshop to see real job roles",
    ],
  },
];

function clampScore(raw: number): number {
  return Math.min(98, Math.max(42, Math.round(raw)));
}

function inferTopStream(paths: CareerPath[]): string {
  const streamCounts: Record<string, number> = {};
  for (const path of paths.slice(0, 3)) {
    const key = path.stream.split("+")[0]?.trim() ?? path.stream;
    streamCounts[key] = (streamCounts[key] ?? 0) + path.fitScore;
  }
  const sorted = Object.entries(streamCounts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? "Explore multiple streams";
}

function getStageAwareNextSteps(
  template: PathTemplate,
  stage: UserLifeStage,
  _answers: AssessmentAnswers,
): string[] {
  if (stage === "school-kid" || stage === "class-12" || stage === "college") {
    return template.nextSteps;
  }

  if (stage === "dropout") {
    return [
      "Pick one short certification or diploma route that fits this path",
      "Build a proof-of-work project or portfolio piece",
      "List 5 target roles or local employers to approach",
      "Create a simple resume and start applying this week",
    ];
  }

  if (stage === "job-seeker") {
    return [
      "Refresh your resume and tailor it to 3 target roles",
      "Build or update a portfolio, GitHub, or case-study set",
      "Apply to 10 targeted roles and reach out to 5 contacts",
      "Track feedback and improve based on the next interview round",
    ];
  }

  if (stage === "interview-prep") {
    return [
      "Review the most likely interview questions for this path",
      "Run 2 mock interviews and note weak spots",
      "Prepare one portfolio story, project demo, or case answer",
      "Create a 3-day prep plan before interview day",
    ];
  }

  return [
    "Pick one skill to upskill this month for this path",
    "Build a portfolio or proof-of-work artifact",
    "Compare 3 target roles, companies, or switch paths",
    "Set one concrete action for this week and one for next month",
  ];
}

/**
 * Rule-based recommendation engine for Phase 1.
 * Replace or augment with OpenAI via src/lib/ai/recommend.ts later.
 */
function stageBonus(templateId: string, stage: UserLifeStage, answers: AssessmentAnswers): number {
  let bonus = 0;

  if (stage === "college" && answers.degreeField === "engineering" && templateId === "engineering-tech") {
    bonus += 12;
  }
  if (stage === "college" && answers.degreeField === "commerce" && templateId === "commerce-finance") {
    bonus += 12;
  }
  if (stage === "dropout" && templateId === "diploma-vocational") {
    bonus += 14;
  }
  if ((stage === "job-seeker" || stage === "interview-prep") && answers.targetIndustry === "it") {
    if (templateId === "engineering-tech") bonus += 10;
  }
  if (stage === "employed" && answers.switchMotivation === "salary" && templateId === "commerce-finance") {
    bonus += 8;
  }
  if (stage === "interview-prep" && templateId === "engineering-tech") {
    bonus += 6;
  }
  if (answers.confidenceLevel === "low") {
    bonus += 4;
  }
  if (answers.timeAvailable === "5plus") {
    bonus += 4;
  }

  return bonus;
}

export function generateRecommendations(
  answers: AssessmentAnswers,
  lifeStage: UserLifeStage = "class-12",
): AssessmentResult {
  const normalized: AssessmentAnswers = {
    ...answers,
    favoriteSubjects: answers.favoriteSubjects ?? [],
    interestArea: answers.interestArea ?? "exploring",
    studyStamina: answers.studyStamina ?? "medium",
    primaryGoal: answers.primaryGoal ?? "stable-job",
    examComfort: answers.examComfort ?? "medium",
    educationBudget: answers.educationBudget ?? "medium",
    locationPreference: answers.locationPreference ?? "anywhere",
  };

  const paths: CareerPath[] = PATH_TEMPLATES.map((template) => {
    const { score, ...rest } = template;
    return {
      ...rest,
      nextSteps: getStageAwareNextSteps(template, lifeStage, normalized),
      fitScore: clampScore(score(normalized) + stageBonus(template.id, lifeStage, normalized)),
    };
  })
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 5);

  return {
    answers: normalized,
    paths,
    topStream: inferTopStream(paths),
    lifeStage,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Future hook: swap implementation to call OpenAI without changing UI.
 *
 * export async function generateRecommendationsWithAI(answers: AssessmentAnswers) {
 *   if (!process.env.OPENAI_API_KEY) return generateRecommendations(answers);
 *   // call OpenAI and parse structured JSON into AssessmentResult
 * }
 */
