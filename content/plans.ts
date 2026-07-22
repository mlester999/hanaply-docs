import { planSchema } from "@/lib/content-schema";

export const plans = planSchema.array().parse([
  {
    name: "Plus",
    monthly: 499,
    annual: 4799,
    description: "Focused intelligence for one clear career direction.",
    features: ["One main career and two sub-careers initially", "About 15-minute discovery priority", "One cover letter and one tailored resume per eligible job", "One configured cover letter and resume style", "About 40 automatic Application Packs monthly", "Email alerts and daily digest", "Basic resume builder and application tracking", "Core AI job analysis"],
  },
  {
    name: "Pro",
    monthly: 999,
    annual: 9599,
    description: "Deeper strategy for multiple profiles and faster decisions.",
    features: ["Multiple career search profiles", "Higher sub-career limits", "About 5-minute discovery priority", "Up to three cover letters and resumes per eligible job", "Three configurable cover letter and resume styles", "About 100 automatic Application Packs monthly", "Instant email and browser alerts", "Advanced analysis and interview preparation", "Recruiter messages and weekly career strategy", "Priority processing and future mobile access"],
  },
]);
