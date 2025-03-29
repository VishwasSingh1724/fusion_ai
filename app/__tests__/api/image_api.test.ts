import { POST } from "../../api/(api-routes)/image/route"; // Adjust based on actual route
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
      credits: 10,
      save: vi.fn(),
    }),
  },
}));

// Mock fetch for image generation API
global.fetch = vi.fn().mockResolvedValue({
  url: "https://dummyimage.com/600x400",
});

describe("POST /api/imagegen", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset mocks before each test
  });

  it("should return an array of generated images and remaining credits", async () => {
    const req = {
      json: vi.fn().mockResolvedValue({
        email: "test@example.com",
        prompt: "A futuristic city",
        selectedSizeOption: 512,
        selectedOption: 3,
      }),
    };

    const response = await POST(req as any);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toHaveProperty("images");
    expect(json.images).toHaveLength(3);
    expect(json).toHaveProperty("remainingCredits");
    expect(json.remainingCredits).toBe(7); // 10 - 3 = 7 credits left
  });
});
