// ─────────────────────────────────────────────────────────────────────────────
// Content barrel — every value here is loaded from /data/**/*.json.
// Edit the JSON files to change site content; never hard-code copy in components.
// ─────────────────────────────────────────────────────────────────────────────

import company from "@/data/collections/company.json";
import founder from "@/data/collections/founder.json";
import stats from "@/data/collections/stats.json";
import services from "@/data/collections/services.json";
import industries from "@/data/collections/industries.json";
import whyChooseUs from "@/data/collections/why-choose-us.json";
import recruitmentProcess from "@/data/collections/recruitment-process.json";
import candidateProcess from "@/data/collections/candidate-process.json";
import employerProcess from "@/data/collections/employer-process.json";
import successStories from "@/data/collections/success-stories.json";
import testimonials from "@/data/collections/testimonials.json";
import awards from "@/data/collections/awards.json";
import partnershipModels from "@/data/collections/partnership-models.json";
import featuredJobs from "@/data/collections/featured-jobs.json";
import candidateServices from "@/data/collections/candidate-services.json";
import careerResources from "@/data/collections/career-resources.json";
import candidateFaq from "@/data/collections/candidate-faq.json";
import employerFaq from "@/data/collections/employer-faq.json";

export type Audience = "employer" | "candidate";

export interface Testimonial {
  id: string;
  type: Audience;
  name: string;
  position: string;
  company?: string;
  testimonial: string;
}

export interface SuccessStory {
  id: string;
  type: Audience;
  title: string;
  metric: string;
  industry: string;
  result: string;
  company?: string;
  name?: string;
  challenge?: string;
  approach?: string;
  previous?: string;
  support?: string;
}

export const COMPANY = company;
export const FOUNDER = founder;
export const STATS = stats;
export const SERVICES = services;
export const INDUSTRIES = industries;
export const WHY_CHOOSE_US = whyChooseUs;
export const RECRUITMENT_PROCESS = recruitmentProcess;
export const CANDIDATE_PROCESS = candidateProcess;
export const EMPLOYER_PROCESS = employerProcess;
export const SUCCESS_STORIES = successStories as SuccessStory[];
export const TESTIMONIALS = testimonials as Testimonial[];
export const AWARDS = awards;
export const PARTNERSHIP_MODELS = partnershipModels;
export const FEATURED_JOBS = featuredJobs;
export const CANDIDATE_SERVICES = candidateServices;
export const CAREER_RESOURCES = careerResources;
export const CANDIDATE_FAQ = candidateFaq;
export const EMPLOYER_FAQ = employerFaq;
