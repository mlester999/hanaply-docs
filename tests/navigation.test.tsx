import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CommandPalette } from "@/components/navigation/CommandPalette";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

afterEach(() => {
  cleanup();
  push.mockReset();
});

describe("command palette keyboard and search flow", () => {
  it("filters destinations and opens the selected route", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<CommandPalette open onClose={onClose} />);
    await user.type(screen.getByRole("textbox", { name: "Search destinations" }), "architecture");
    expect(screen.getByRole("button", { name: /Open Architecture/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Open Career Radar/i })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Open Architecture/i }));
    expect(push).toHaveBeenCalledWith("/architecture");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("closes on Escape", () => {
    const onClose = vi.fn();
    render(<CommandPalette open onClose={onClose} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });
});
