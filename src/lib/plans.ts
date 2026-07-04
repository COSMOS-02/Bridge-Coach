import type { Currency, SubscriptionPlan } from "./types";

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Start exploring your options",
    cta: "Current plan",
    features: [
      "1 career path snapshot",
      "Basic stream / role overview",
      "Limited assessment questions",
      "Sample pros & cons for top path",
    ],
  },
  {
    id: "student",
    name: "Student",
    tagline: "School to college — full guidance",
    cta: "Pricing at launch",
    highlighted: true,
    features: [
      "Full stage-specific assessment",
      "Up to 5 personalized path reports",
      "Pros, cons & fit scores for each path",
      "90-day action roadmap",
      "Exam & placement awareness",
      "Monthly coach check-ins",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Deep guidance + ongoing coach",
    cta: "Pricing at launch",
    features: [
      "Everything in Student",
      "College / employer shortlists",
      "Degree & role ROI comparison",
      "Interview prep modules",
      "Unlimited re-assessments",
      "Priority AI coach chat (coming soon)",
    ],
  },
];

export function getPricingLabel(currency: Currency): {
  badge: string;
  priceLine: string;
  subline: string;
  paymentNote: string;
} {
  if (currency === "INR") {
    return {
      badge: "India · Pay in INR (₹)",
      priceLine: "Pricing at launch",
      subline: "UPI, cards & netbanking via Razorpay",
      paymentNote: "GST-inclusive pricing at launch · built for India",
    };
  }

  if (currency === "USD") {
    return {
      badge: "International · Pay in USD ($)",
      priceLine: "Pricing at launch",
      subline: "Cards & international payments via Stripe",
      paymentNote: "USD pricing at launch · global access",
    };
  }

  if (currency === "EUR") {
    return {
      badge: "Europe · Pay in EUR (€)",
      priceLine: "Pricing at launch",
      subline: "Cards & regional payments via Stripe",
      paymentNote: "EUR pricing at launch · EU-friendly access",
    };
  }

  if (currency === "GBP") {
    return {
      badge: "UK · Pay in GBP (£)",
      priceLine: "Pricing at launch",
      subline: "Cards & local checkout support",
      paymentNote: "GBP pricing at launch · UK-friendly access",
    };
  }

  if (currency === "AUD") {
    return {
      badge: "Australia · Pay in AUD (A$)",
      priceLine: "Pricing at launch",
      subline: "Cards & regional checkout support",
      paymentNote: "AUD pricing at launch · Australia-friendly access",
    };
  }

  if (currency === "CAD") {
    return {
      badge: "Canada · Pay in CAD (C$)",
      priceLine: "Pricing at launch",
      subline: "Cards & regional checkout support",
      paymentNote: "CAD pricing at launch · Canada-friendly access",
    };
  }

  if (currency === "SGD") {
    return {
      badge: "Singapore · Pay in SGD (S$)",
      priceLine: "Pricing at launch",
      subline: "Cards & regional checkout support",
      paymentNote: "SGD pricing at launch · Singapore-friendly access",
    };
  }

  return {
    badge: `International · Pay in ${currency}`,
    priceLine: "Pricing at launch",
    subline: "Cards & regional payments via Stripe",
    paymentNote: `${currency} pricing at launch · global access`,
  };
}
