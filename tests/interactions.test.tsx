import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ApplicationPackDemo, ClaimVerificationDemo } from "@/components/application/ApplicationPackDemo";
import { ResumeComparison } from "@/components/product/ProductPreviews";
import { CareerRadarSimulator } from "@/components/radar/CareerRadarSimulator";
import { RoadmapExplorer } from "@/components/roadmap/RoadmapExplorer";
import { ArchitectureExplorer } from "@/components/architecture/ArchitectureExplorer";
import { CareerSignalPreview } from "@/components/vision/CareerSignalPreview";
import { JobIntelligence } from "@/components/vision/VisionHome";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("product vision interactions", () => {
  it("removes an unsupported career claim", async () => {
    const user = userEvent.setup();
    render(<ClaimVerificationDemo />);
    await user.click(screen.getByRole("button", { name: /show an unsupported version/i }));
    expect(screen.getByText("Unsupported claim removed")).toBeInTheDocument();
    expect(screen.getByText(/not backed by confirmed profile details/i)).toBeInTheDocument();
  });

  it("changes resume strategy without changing the verified-facts note", () => {
    render(<ResumeComparison />);
    fireEvent.click(screen.getByRole("button", { name: "Technical Depth" }));
    expect(screen.getAllByText("Technical profile")).toHaveLength(2);
    expect(screen.getByText(/Verified employment dates, facts, and credentials never change/i)).toBeInTheDocument();
  });

  it("runs the Career Radar and exposes explainable sample results", async () => {
    vi.useFakeTimers();
    render(<CareerRadarSimulator />);
    fireEvent.click(screen.getByRole("button", { name: /run career radar/i }));
    for (let step = 0; step < 6; step += 1) {
      await act(async () => vi.advanceTimersByTimeAsync(500));
    }
    expect(screen.getByText("Radar complete")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Senior Platform Director/i })).toHaveAttribute("aria-selected", "false");
    fireEvent.click(screen.getByRole("tab", { name: /Senior Platform Director/i }));
    expect(screen.getByText(/Do not apply under the current profile/i)).toBeInTheDocument();
  });

  it("uses a compact custom career picker instead of a native mobile select", () => {
    const { container } = render(<CareerRadarSimulator />);
    const careerPicker = screen.getByRole("button", { name: /Main career/i });

    expect(container.querySelector("select")).not.toBeInTheDocument();
    fireEvent.click(careerPicker);
    fireEvent.click(screen.getByRole("option", { name: "Full Stack Developer" }));

    expect(careerPicker).toHaveTextContent("Full Stack Developer");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("switches Application Pack content and keeps facts fixed", () => {
    render(<ApplicationPackDemo />);
    fireEvent.click(screen.getByRole("tab", { name: /tailored resume/i }));
    fireEvent.click(screen.getByRole("tab", { name: "Technical Depth" }));
    expect(screen.getByText("Tools and architecture become prominent")).toBeInTheDocument();
    expect(screen.getByText(/Facts and dates remain fixed/i)).toBeInTheDocument();
  });

  it("opens roadmap phases and architecture nodes with semantic controls", () => {
    const roadmapView = render(<RoadmapExplorer />);
    fireEvent.click(screen.getByRole("button", { name: /Application Packs$/i }));
    expect(screen.getByRole("heading", { name: "Application Packs" })).toBeInTheDocument();
    roadmapView.unmount();

    render(<ArchitectureExplorer />);
    fireEvent.click(screen.getByRole("button", { name: /Career matching/i }));
    expect(screen.getByRole("heading", { name: "Career matching" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Show flat diagram" }));
    expect(screen.getByLabelText("Interactive Hanaply system architecture")).toHaveClass("flat");
  });

  it("explains a worthwhile opportunity with concrete evidence", () => {
    render(<CareerSignalPreview step={4} />);
    expect(screen.getByLabelText(/Example opportunity review/i)).toBeInTheDocument();
    expect(screen.getByText("Strong match")).toBeInTheDocument();
    expect(screen.getByText(/No hard blockers found/i)).toBeInTheDocument();
  });

  it("updates classified evidence and verdict impact for each requirement", () => {
    render(<JobIntelligence />);
    fireEvent.click(screen.getByRole("tab", { name: /Location/i }));

    expect(screen.getByText(/Applicants must be based in the Philippines/i)).toBeInTheDocument();
    expect(screen.getByText("Philippines eligibility")).toBeInTheDocument();
    expect(screen.getByText("Clears a hard constraint")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Location/i })).toHaveAttribute("aria-selected", "true");
  });
});
