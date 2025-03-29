import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import FeaturedSection from "../../../components/FeaturesSection";

// Mock Framer Motion
vi.mock("framer-motion", () => ({
  ...vi.importActual("framer-motion"),
  motion: {
    div: (props: any) => <div {...props} />,
    h2: (props: any) => <h2 {...props} />,
    h3: (props: any) => <h3 {...props} />,
    p: (props: any) => <p {...props} />,
  },
  useMotionValueEvent: vi.fn(),
  useScroll: vi.fn(() => ({ scrollYProgress: { on: vi.fn() } })),
}));

// Mock WaveyImage
vi.mock("@/components/WaveyImage", () => ({
  __esModule: true,
  default: () => <img alt="Wavey Effect Image" />,
}));

const mockContent = [
  { title: "Feature One", description: "Description for feature one", imageUrl: "image1.jpg", effect: "effect1" },
  { title: "Feature Two", description: "Description for feature two", imageUrl: "image2.jpg", effect: "effect2" },
];

describe("FeaturedSection Component", () => {
  it("renders the section title", () => {
    render(<FeaturedSection content={mockContent} contentClassName="test-class"/>);
    expect(screen.getByText(/Featured Solutions/i)).toBeInTheDocument();
  });

  it("renders all feature titles", () => {
    render(<FeaturedSection content={mockContent} contentClassName="test-class"/>);
    mockContent.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("renders all feature descriptions", () => {
    render(<FeaturedSection content={mockContent} contentClassName="test-class"/>);
    mockContent.forEach((item) => {
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });

  it("renders the WaveyImage component", () => {
    render(<FeaturedSection content={mockContent} contentClassName="test-class"/>);
    expect(screen.getByAltText("Wavey Effect Image")).toBeInTheDocument();
  });
});
