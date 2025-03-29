// @ts-ignore
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest"; // ✅ Use Vitest mocks
import Code from "../../(root)/(routes)/code/page"; // Adjust path if needed
import { useUser } from "@clerk/nextjs";

// Mock Clerk's useUser hook with Vitest
vi.mock("@clerk/nextjs", () => ({
  useUser: vi.fn(),
}));

describe("Code Page", () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({
      user: {
        primaryEmailAddress: {
          emailAddress: "test@example.com",
        },
      },
    });
  });

  it("renders the Code Generation page correctly", () => {
    render(<Code />);
    expect(screen.getByText("Code Generation")).toBeInTheDocument();
  });

  it("updates the input value correctly", () => {
    render(<Code />);
    const input = screen.getByPlaceholderText("Generate Hello World code");
    fireEvent.change(input, { target: { value: "Write a JavaScript function" } });
    expect(input).toHaveValue("Write a JavaScript function");
  });

  it("disables the generate button when loading", async () => {
    render(<Code />);
    const button = screen.getByText("Generate");
    fireEvent.click(button);
    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });
});
