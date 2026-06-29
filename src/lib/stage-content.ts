import type { UserLifeStage } from "./types";

export type StageContent = {
  badge: string;
  headline: string;
  headlineAccent: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  features: { title: string; description: string }[];
  steps: { num: string; title: string; body: string }[];
  assessIntro: string;
  resultsTitle: string;
  resultsSubtitle: string;
};

export const STAGE_CONTENT: Record<UserLifeStage, StageContent> = {
  "school-kid": {
    badge: "School · Class 8–10",
    headline: "Not sure which stream fits you?",
    headlineAccent: "Discover Science, Commerce, or Arts early.",
    description:
      "Bridge Coach helps school students explore strengths, compare streams, and start building the right habits before Class 10 pressure begins.",
    ctaPrimary: "Start my assessment",
    ctaSecondary: "View plans",
    features: [
      {
        title: "Early stream clarity",
        description: "Understand PCM, PCB, Commerce, and Arts before the big Class 10 decision.",
      },
      {
        title: "Strength-based paths",
        description: "See careers that match how you learn and what subjects you enjoy.",
      },
      {
        title: "Parent-friendly reports",
        description: "Clear pros, cons, and fit scores families can discuss together.",
      },
    ],
    steps: [
      { num: "1", title: "Answer 12 tailored questions", body: "Interests, learning style, goals, family support." },
      { num: "2", title: "Get stream + career paths", body: "Ranked options with honest trade-offs." },
      { num: "3", title: "Follow your school roadmap", body: "Weekly actions to build confidence early." },
    ],
    assessIntro: "School assessment · ~4 minutes",
    resultsTitle: "Your early career direction",
    resultsSubtitle: "Paths aligned with your school profile and stream options.",
  },
  "class-12": {
    badge: "Class 12 · Boards + next step",
    headline: "Confused after Class 10?",
    headlineAccent: "Find your right stream & career path.",
    description:
      "Bridge Coach helps Class 11–12 students choose streams, degrees, and entrance exam routes with pros, cons, fit scores, and next steps.",
    ctaPrimary: "Start free assessment",
    ctaSecondary: "View plans",
    features: [
      {
        title: "Stream clarity after Class 10",
        description: "Science, Commerce, or Arts — understand what fits before board pressure hits.",
      },
      {
        title: "Career paths with pros & cons",
        description: "See up to 5 paths with fit scores, earning ranges, and effort level.",
      },
      {
        title: "Built for India",
        description: "JEE, NEET, CA, CLAT, diplomas, and realistic salary bands.",
      },
    ],
    steps: [
      { num: "1", title: "Answer 12 quick questions", body: "Interests, goals, budget, exam comfort." },
      { num: "2", title: "Get your path report", body: "Personalized streams and careers ranked for you." },
      { num: "3", title: "Follow your roadmap", body: "Next steps you can act on this week." },
    ],
    assessIntro: "Class 10–12 assessment · ~4 minutes",
    resultsTitle: "Top career paths for you",
    resultsSubtitle: "Based on your stream goals, exam comfort, and earning priorities.",
  },
  college: {
    badge: "College · Degree in progress",
    headline: "In college but unsure what's next?",
    headlineAccent: "Plan internships, skills, and your first great role.",
    description:
      "Bridge Coach maps your degree to high-demand roles, placement prep, and upskilling paths so you graduate with direction — not confusion.",
    ctaPrimary: "Start college assessment",
    ctaSecondary: "View plans",
    features: [
      {
        title: "Degree-to-career mapping",
        description: "Connect your branch to roles with strong hiring and salary growth.",
      },
      {
        title: "Internship & skill plan",
        description: "Know which projects, certs, and portfolios recruiters actually want.",
      },
      {
        title: "Placement readiness",
        description: "Interview prep, resume gaps, and timeline to campus or off-campus success.",
      },
    ],
    steps: [
      { num: "1", title: "Share your degree & goals", body: "Field, timeline, internship status, target industry." },
      { num: "2", title: "Get role recommendations", body: "Career paths ranked for your college stage." },
      { num: "3", title: "Execute your semester plan", body: "Skills, networking, and application milestones." },
    ],
    assessIntro: "College assessment · ~4 minutes",
    resultsTitle: "Career paths after your degree",
    resultsSubtitle: "Roles and upskilling routes matched to your graduation timeline.",
  },
  dropout: {
    badge: "Dropout · Gap year rebuild",
    headline: "Paused college? You can still build a strong career.",
    headlineAccent: "Skill-first paths with realistic earning potential.",
    description:
      "Bridge Coach helps you identify strengths, short certifications, and job routes that don't require starting from zero — honestly and without judgment.",
    ctaPrimary: "Rebuild my path",
    ctaSecondary: "View plans",
    features: [
      {
        title: "No-judgment guidance",
        description: "Practical routes via diplomas, certifications, and skill-first hiring.",
      },
      {
        title: "Fast employment options",
        description: "Compare timelines to first income vs long degree routes.",
      },
      {
        title: "Upskill roadmap",
        description: "Step-by-step plan to rebuild confidence and employability.",
      },
    ],
    steps: [
      { num: "1", title: "Tell us your story", body: "Gap duration, skills built, constraints, goals." },
      { num: "2", title: "See viable paths", body: "Options ranked by fit, effort, and earning potential." },
      { num: "3", title: "Start this week", body: "Concrete actions — courses, projects, job targets." },
    ],
    assessIntro: "Rebuild assessment · ~4 minutes",
    resultsTitle: "Paths to restart strong",
    resultsSubtitle: "Skill-first and certification routes tailored to your situation.",
  },
  "job-seeker": {
    badge: "Job seeker · Active hunt",
    headline: "Looking for your next role?",
    headlineAccent: "Target the right jobs and fix what's blocking offers.",
    description:
      "Bridge Coach analyses your experience, resume readiness, and industry targets — then gives you a focused job search plan with higher offer potential.",
    ctaPrimary: "Start job search plan",
    ctaSecondary: "View plans",
    features: [
      {
        title: "Role targeting",
        description: "Focus on industries and titles where your profile has the best fit.",
      },
      {
        title: "Resume & gap analysis",
        description: "Know what's missing before you send another application.",
      },
      {
        title: "90-day job hunt system",
        description: "Weekly applications, networking, and skill priorities.",
      },
    ],
    steps: [
      { num: "1", title: "Profile your job search", body: "Experience, target industry, resume status." },
      { num: "2", title: "Get matched roles", body: "Paths ranked by hiring demand and your fit." },
      { num: "3", title: "Execute weekly", body: "Applications, outreach, and interview prep tasks." },
    ],
    assessIntro: "Job seeker assessment · ~4 minutes",
    resultsTitle: "Best role targets for you",
    resultsSubtitle: "Career paths and job search priorities based on your profile.",
  },
  "interview-prep": {
    badge: "Interview prep · Offer ready",
    headline: "Interview coming up?",
    headlineAccent: "Prepare smarter with role-specific focus areas.",
    description:
      "Bridge Coach identifies your interview type, timeline, and weak spots — then builds a prep plan for technical, HR, and case rounds.",
    ctaPrimary: "Start interview prep",
    ctaSecondary: "View plans",
    features: [
      {
        title: "Interview-type focus",
        description: "Campus, product, service company, or government — tailored prep.",
      },
      {
        title: "Weak-spot detection",
        description: "Know which answers and skills to drill before D-day.",
      },
      {
        title: "Daily prep schedule",
        description: "Countdown plan based on how many days you have left.",
      },
    ],
    steps: [
      { num: "1", title: "Share interview details", body: "Type, timeline, role target, confidence level." },
      { num: "2", title: "Get prep priorities", body: "Ranked focus areas and mock question themes." },
      { num: "3", title: "Practice daily", body: "Structured drills until interview day." },
    ],
    assessIntro: "Interview prep · ~3 minutes",
    resultsTitle: "Your interview prep plan",
    resultsSubtitle: "Focus areas and practice priorities for your upcoming rounds.",
  },
  employed: {
    badge: "Employed · Growth & switch",
    headline: "Already working? Earn more or switch smarter.",
    headlineAccent: "Upskill, pivot, or climb — with a clear plan.",
    description:
      "Bridge Coach helps employed professionals choose between promotion, switch, and upskilling paths — with earning upside and realistic timelines.",
    ctaPrimary: "Plan my next move",
    ctaSecondary: "View plans",
    features: [
      {
        title: "Salary growth paths",
        description: "Compare staying, switching, and upskilling ROI for your role.",
      },
      {
        title: "Switch vs stay analysis",
        description: "Honest pros and cons before you resign impulsively.",
      },
      {
        title: "Executive skill roadmap",
        description: "Leadership, domain depth, or cross-functional moves.",
      },
    ],
    steps: [
      { num: "1", title: "Share your current role", body: "Experience, motivation, upskill interests." },
      { num: "2", title: "See growth paths", body: "Promotion, switch, or side-skill routes ranked." },
      { num: "3", title: "Act this quarter", body: "Courses, networking, and transition milestones." },
    ],
    assessIntro: "Career growth assessment · ~4 minutes",
    resultsTitle: "Your next career move",
    resultsSubtitle: "Growth, switch, and upskilling paths aligned with your current role.",
  },
};

export function getStageContent(stage: UserLifeStage | null | undefined): StageContent {
  return STAGE_CONTENT[stage ?? "class-12"];
}
