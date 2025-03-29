import { render, screen } from "@testing-library/react";
import { Banner } from "../../../components/Banner";
import "@testing-library/jest-dom";

describe("Banner Component", () => {
  it("renders the banner text correctly", () => {
    render(<Banner />);
    
    expect(screen.getByText(/introducing a website with different AI features in one place/i)).toBeInTheDocument();
  });

  it("renders the link with correct text", () => {
    render(<Banner />);
    
    const linkElement = screen.getByRole("link", { name: /explore the website/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "#");
  });

  it("has the correct background gradient class", () => {
    const { container } = render(<Banner />);
    
    expect(container.firstChild).toHaveClass(
      "bg-[linear-gradient(to_right,rgb(252,_214,_255,_.7),rgb(41,_216,_255,_.7),rgb(255,_253,_128,_.7),rgb(248,_154,_191,_.7),rgb(252,_214,_255,_.7))]"
    );
  });
});
