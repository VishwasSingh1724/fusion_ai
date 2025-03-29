import { POST } from "../../api/(api-routes)/conversation/route"; // Adjust based on actual route
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock database connection
vi.mock("@/db/DbConnection", () => ({
  default: vi.fn(),
}));

// Mock User model
vi.mock("@/db/models/user.model", () => ({
  User: {
    findOne: vi.fn().mockResolvedValue({
      email: "test@example.com",
      credits: 5,
      save: vi.fn(),
    }),
  },
}));

// Mock GoogleGenerativeAI
vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => "Generated response text",
        },
      }),
    }),
  })),
}));

describe("POST /api/gemini", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset mocks before each test
  });

  it("should return a response with generated text and remaining credits", async () => {
    const req = {
      json: vi.fn().mockResolvedValue({
        email: "test@example.com",
        userPrompt: "Tell me about AI",
      }),
    };

    const response = await POST(req as any);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toHaveProperty("text");
    expect(json).toHaveProperty("remainingCredits");
  });
});
