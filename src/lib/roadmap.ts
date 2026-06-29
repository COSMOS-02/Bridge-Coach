import type { AssessmentResult } from "./types";

export type RoadmapMilestone = {
  period: string;
  title: string;
  steps: string[];
};

export function buildRoadmap(result: AssessmentResult): {
  focus: string;
  milestones: RoadmapMilestone[];
} {
  const topPath = result.paths[0];
  const goal = result.answers.primaryGoal ?? "stable-job";
  const subjects = result.answers.favoriteSubjects?.slice(0, 2) ?? [];
  const subjectText = subjects.length ? subjects.join(", ") : "your interests";

  const thisMonthSteps = [
    `Start with one concrete action for ${topPath.name.toLowerCase()}: read 2–3 resources or build a mini project around ${subjectText}.`,
    `Choose one decision this month: stream, branch, role target, or next certification based on your fit score.`,
    `Keep a simple checklist so you can revisit your plan every weekend without feeling overwhelmed.`,
  ];

  const thisYearSteps = [
    `Build evidence for the path through projects, internships, exams, or portfolio work that fits your goal: ${goal}.`,
    `Spend 3–5 focused hours each week on the highest-leverage skill for this path.`,
    `Re-evaluate after 3–6 months if your interests or constraints change.`,
  ];

  const fiveYearsSteps = [
    `Use this path to create a long-term identity: stronger profile, better networks, and clearer positioning.`,
    `Aim for one visible milestone each year, such as a placement, certification, promotion, or business launch.`,
    `Keep your coach plan flexible so you can pivot when life changes without losing momentum.`,
  ];

  return {
    focus: `${topPath.name} · ${result.topStream}`,
    milestones: [
      {
        period: "This month",
        title: "Build momentum",
        steps: thisMonthSteps,
      },
      {
        period: "This year",
        title: "Turn insight into evidence",
        steps: thisYearSteps,
      },
      {
        period: "5 years",
        title: "Create a durable career edge",
        steps: fiveYearsSteps,
      },
    ],
  };
}
