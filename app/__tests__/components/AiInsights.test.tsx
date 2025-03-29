import { render, screen, waitFor } from "@testing-library/react";
import { AIInsight } from "../../../components/AiInsight";
import { vi } from "vitest";

describe("AIInsight Component", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Mock timers
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it("renders AIInsight component with initial insight", () => {
    render(<AIInsight />);
    
    expect(screen.getByText("AI Insight")).toBeInTheDocument();
    expect(screen.getByText(/Your code generation has improved by 15%/)).toBeInTheDocument();
  });

});
