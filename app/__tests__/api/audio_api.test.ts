import { POST } from "../../api/(api-routes)/audio/route";
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
      credits: 2,
      save: vi.fn(),
    }),
  },
}));

// Mock fetch for Musicfy API
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ musicUrl: "https://example.com/song.mp3" }),
  })
) as any;

describe("POST /api/audio", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset mocks before each test
  });

  it("should return a response with music and remainingCredits", async () => {
    const req = { 
      json: vi.fn().mockResolvedValue({ email: "test@example.com", prompt: "Lo-fi chill beat" }),
    };

    const response = await POST(req as any);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toHaveProperty("music");
    expect(json).toHaveProperty("remainingCredits");
  });
});
