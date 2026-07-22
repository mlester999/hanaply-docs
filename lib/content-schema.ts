import { z } from "zod";

export const phaseStatusSchema = z.enum([
  "Planned",
  "In Design",
  "In Development",
  "Validation",
  "Complete",
  "Blocked",
]);

export const roadmapPhaseSchema = z.object({
  id: z.string().min(1),
  number: z.string().min(1),
  title: z.string().min(1),
  status: phaseStatusSchema,
  purpose: z.string().min(1),
  deliverables: z.array(z.string()).min(1),
  dependencies: z.array(z.string()),
  gates: z.array(z.string()).min(1),
  risks: z.array(z.string()).min(1),
  decisions: z.array(z.string()),
});

export const architectureNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  layer: z.enum(["source", "intelligence", "platform", "experience", "control"]),
  purpose: z.string().min(1),
  inputs: z.array(z.string()),
  outputs: z.array(z.string()),
  security: z.string().min(1),
  ownership: z.string().min(1),
  phase: z.string().min(1),
  failure: z.string().min(1),
  mobile: z.string().min(1),
});

export const planSchema = z.object({
  name: z.enum(["Plus", "Pro"]),
  monthly: z.number().positive(),
  annual: z.number().positive(),
  description: z.string().min(1),
  features: z.array(z.string()).min(1),
});
