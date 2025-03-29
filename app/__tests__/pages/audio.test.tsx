// @ts-ignore
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Audio from "../../(root)/(routes)/audio/page";

vi.mock("@clerk/nextjs", () => ({
  useUser: vi.fn(() => ({
    user: { primaryEmailAddress: { emailAddress: "test@example.com" } },
  })),
}));

describe("Audio Page", () => {
  it("renders the page correctly", () => {
    render(<Audio />);
    expect(screen.getByText("Music Generation")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter music prompt")).toBeInTheDocument();
    expect(screen.getByText("Generate")).toBeInTheDocument();
  });

  it("updates the prompt input", () => {
    render(<Audio />);
    const input = screen.getByPlaceholderText("Enter music prompt") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Relaxing piano music" } });
    expect(input.value).toBe("Relaxing piano music");
  });

  it("handles button click", async () => {
    render(<Audio />);
    const button = screen.getByText("Generate");
    fireEvent.click(button);
    expect(button).toBeDisabled(); // Ensuring the button gets disabled while loading
  });
});
