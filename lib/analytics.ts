export type VisionEvent =
  | "section_viewed"
  | "career_radar_started"
  | "sample_job_opened"
  | "application_pack_explored"
  | "roadmap_phase_opened"
  | "architecture_node_opened"
  | "pricing_toggled"
  | "mobile_vision_viewed"
  | "documentation_searched";

export function trackVisionEvent(event: VisionEvent, detail: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("hanaply:vision-event", { detail: { event, ...detail } }));
}
