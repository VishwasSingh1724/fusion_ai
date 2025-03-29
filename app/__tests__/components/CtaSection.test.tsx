import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CtaSection from "../../../components/CtaSection";

// Mock Next.js Image
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("CtaSection Component", () => {
  it("renders the heading text", () => {
    render(<CtaSection />);
    expect(
      screen.getByText(/Boost your productivity/i)
    ).toBeInTheDocument();
  });

  it("renders the Get Started button", () => {
    render(<CtaSection />);
    expect(screen.getByText(/Get started/i)).toBeInTheDocument();
  });

  it("renders the Learn More button", () => {
    render(<CtaSection />);
    expect(screen.getByText(/Learn more/i)).toBeInTheDocument();
  });

});
