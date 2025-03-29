import { render, screen, fireEvent } from "@testing-library/react";
import { AssetCard } from "../../../components/AssetCard";
import { vi } from "vitest";

describe("AssetCard Component", () => {
  const mockProps = {
    type:"image" as const,
    count: 5,
    recentItems: ["Image 1", "Image 2", "Image 3"],
    url: "/create-image",
    assetUrl: "/images",
  };


  it("renders correctly with props", () => {
    render(<AssetCard {...mockProps} />);

    expect(screen.getByText("image")).toBeInTheDocument(); // Asset type
    expect(screen.getByText("5")).toBeInTheDocument(); // Asset count
    expect(screen.getByText("Generated assets")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show recent" })).toBeInTheDocument();
  });

  it("toggles recent items list when clicked", () => {
    render(<AssetCard {...mockProps} />);
    
    const toggleButton = screen.getByRole("button", { name: "Show recent" });

    fireEvent.click(toggleButton);
    expect(screen.getByText("Image 1")).toBeInTheDocument();
    expect(screen.getByText("Image 2")).toBeInTheDocument();
    expect(screen.getByText("Image 3")).toBeInTheDocument();

    fireEvent.click(toggleButton);
  });

  it("renders create and view buttons with correct links", () => {
    render(<AssetCard {...mockProps} />);

    const createButton = screen.getByRole("button", { name: "Create New image" });
    const viewButton = screen.getByRole("button", { name: "View All images" });

    expect(createButton).toBeInTheDocument();
    expect(viewButton).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Create New image" })).toHaveAttribute("href", "/create-image");
    expect(screen.getByRole("link", { name: "View All images" })).toHaveAttribute("href", "/dashboard/images");
  });
});
