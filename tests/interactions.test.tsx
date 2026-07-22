import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ApplicationPackDemo, TruthGateDemo } from "@/components/application/ApplicationPackDemo";
import { ResumeComparison } from "@/components/product/ProductPreviews";
import { CareerRadarSimulator } from "@/components/radar/CareerRadarSimulator";
import { RoadmapExplorer } from "@/components/roadmap/RoadmapExplorer";
import { ArchitectureExplorer } from "@/components/architecture/ArchitectureExplorer";
import { CareerSignalScene } from "@/components/three/ProductScenes";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("product vision interactions", () => {
  it("blocks an unsupported career claim", async () => {
    const user = userEvent.setup();
    render(<TruthGateDemo />);
    await user.click(screen.getByRole("button", { name: /test unsupported claim/i }));
    expect(screen.getByText("Blocked by Truth Gate")).toBeInTheDocument();
    expect(screen.getByText(/No verified fact supports this claim/i)).toBeInTheDocument();
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
    const careerPicker = screen.getByRole("button", { name: "Main career" });

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

  it("uses the semantic Career Radar fallback when reduced motion is requested", () => {
    const { container } = render(<CareerSignalScene />);
    expect(screen.getByLabelText(/Career Radar filters weak signals/i)).toBeInTheDocument();
    expect(container.querySelector("canvas")).not.toBeInTheDocument();
    expect(container.querySelector(".radar-fallback")).toBeInTheDocument();
  });
});
