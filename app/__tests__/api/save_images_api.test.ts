import { User } from "@/db/models/user.model";
import { POST } from "../../api/(api-routes)/save-transformed-image/route";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/db/DbConnection", () => ({
  default: vi.fn(),
}));

vi.mock("@/db/models/user.model", () => ({
  User: {
    findOne: vi.fn().mockResolvedValue({
      _id: "user123",
      email: "test@example.com",
      transformedImages: [],
      save: vi.fn(),
    }),
    findById: vi.fn().mockResolvedValue({
      _id: "user123",
      transformedImages: [{ _id: "img123", title: "test-image", url: "https://example.com/image.jpg" }],
    }),
  },
}));

vi.mock("@/db/models/transformes-image.model", () => ({
  default: {
    create: vi.fn().mockResolvedValue({
      _id: "img123",
      title: "test-image",
      url: "https://example.com/image.jpg",
      userId: "user123",
      populate: vi.fn().mockResolvedValue({}),
    }),
  },
}));

describe("POST /api/save-transformed-image", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should save the transformed image and return success message", async () => {
    const req = new Request("http://localhost/api/save-transformed-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        title: "test-image",
        url: "https://example.com/image.jpg",
      }),
    });

    const response = await POST(req as any);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toHaveProperty("message", "Transformed Image saved successfully!");
    expect(json).toHaveProperty("image");
    expect(json.image).toHaveProperty("_id", "img123");
  });

  it("should return error if user is not found", async () => {
    vi.mocked(User.findOne).mockResolvedValue(null);

    const req = new Request("http://localhost/api/save-transformed-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "nonexistent@example.com",
        title: "test-image",
        url: "https://example.com/image.jpg",
      }),
    });

    const response = await POST(req as any);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toHaveProperty("message", "User not found");
  });

  it("should handle database errors", async () => {
    vi.mocked(User.findOne).mockRejectedValue(new Error("Database error"));

    const req = new Request("http://localhost/api/save-transformed-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        title: "test-image",
        url: "https://example.com/image.jpg",
      }),
    });

    const response = await POST(req as any);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toHaveProperty("message", "Failed to save Transformed Image.");
  });
});
