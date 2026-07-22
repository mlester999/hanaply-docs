import { describe, expect, it } from "vitest";
import { roadmap } from "@/content/roadmap";
import { architectureNodes } from "@/content/architecture";
import { plans } from "@/content/plans";
import { readFileSync } from "node:fs";

describe("owner-editable content", () => {
  it("keeps every production roadmap phase explicit and unclaimed", () => {
    expect(roadmap).toHaveLength(12);
    expect(roadmap.every((phase) => phase.status === "Planned")).toBe(true);
    expect(new Set(roadmap.map((phase) => phase.id)).size).toBe(roadmap.length);
  });

  it("describes every architecture node with failure and mobile behavior", () => {
    expect(architectureNodes.length).toBeGreaterThan(10);
    expect(architectureNodes.every((node) => node.failure.length > 10 && node.mobile.length > 10)).toBe(true);
  });

  it("calculates the advertised annual savings honestly", () => {
    const plus = plans.find((plan) => plan.name === "Plus")!;
    const pro = plans.find((plan) => plan.name === "Pro")!;
    expect(plus.monthly * 12 - plus.annual).toBe(1189);
    expect(pro.monthly * 12 - pro.annual).toBe(2389);
  });

  it("keeps responsive, focus, and reduced-motion safety rules in the shipped CSS", () => {
    const responsive = readFileSync(`${process.cwd()}/app/responsive.css`, "utf8");
    const global = readFileSync(`${process.cwd()}/app/globals.css`, "utf8");
    for (const width of [1280, 1180, 1050, 800, 520]) expect(responsive).toContain(`max-width: ${width}px`);
    expect(responsive).toContain("prefers-reduced-motion: reduce");
    expect(global).toContain(":focus-visible");
    expect(global).toContain("overflow-x: clip");
    expect(global).not.toContain(".desktop-nav a.active::after");
    const pixelSizes = [...`${global}${responsive}`.matchAll(/font-size:\s*(\d+)px/g)].map((match) => Number(match[1]));
    expect(Math.min(...pixelSizes)).toBeGreaterThanOrEqual(11);
  });
});
