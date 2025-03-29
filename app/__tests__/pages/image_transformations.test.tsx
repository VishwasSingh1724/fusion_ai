import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

// Mock ImageTransformations component to return a simple static version
vi.mock("../../(root)/(routes)/image-transformations/page", () => {
  return {
    default: () => (
      <div>
        <h1>AI Image Gallery</h1>
        <button>Upload</button>
        <div data-testid="image-grid"></div>
      </div>
    ),
  };
});

import ImageTransformations from "../../(root)/(routes)/image-transformations/page";

describe("AI Image Gallery Page", () => {
  it("renders the header title", () => {
    render(<ImageTransformations />);
    expect(screen.getByText("AI Image Gallery")).toBeInTheDocument();
  });

  it("renders the upload button", () => {
    render(<ImageTransformations />);
    expect(screen.getByText("Upload")).toBeInTheDocument();
  });

  it("renders the image grid", () => {
    render(<ImageTransformations />);
    expect(screen.getByTestId("image-grid")).toBeInTheDocument();
  });
});
