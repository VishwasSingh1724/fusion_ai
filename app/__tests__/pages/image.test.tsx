import { render, screen } from "@testing-library/react";
import Image from "../../(root)/(routes)/image/page";
import { vi } from "vitest";

vi.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    user: { primaryEmailAddress: { emailAddress: "test@example.com" } },
  }),
}));

describe("Image Generation Page", () => {
  it("renders the header", () => {
    render(<Image />);
    expect(screen.getByText("Image Generation")).toBeInTheDocument();
    expect(
      screen.getByText("Generates Images by leveraging the power of AI")
    ).toBeInTheDocument();
  });

  it("renders generate button", () => {
    render(<Image />);
    expect(screen.getByText("Generate")).toBeInTheDocument();
  });

  it("renders resolution select", () => {
    render(<Image />);
    expect(screen.getByText("512x512")).toBeInTheDocument();
    expect(screen.getByText("724x724")).toBeInTheDocument();
    expect(screen.getByText("1024x1024")).toBeInTheDocument();
  });

  it("renders number of images select", () => {
    render(<Image />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
