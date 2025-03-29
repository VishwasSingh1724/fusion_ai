import { POST } from "../../api/(api-routes)/save-code/route"; // Adjust path based on your project
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/db/DbConnection", () => ({
    default: vi.fn(),
  }));
  
  vi.mock("@/db/models/user.model", () => ({
    User: {
      findOne: vi.fn().mockResolvedValue({
        _id: "user123",
        email: "test@example.com",
        code: [],
        save: vi.fn(),
      }),
    },
  }));
  
  vi.mock("@/db/models/code.model", () => ({
    default: {
      create: vi.fn().mockResolvedValue({
        _id: "code123",
        prompt: "Generate a function",
        code: "function test() {}",
        userId: "user123",
        populate: vi.fn().mockResolvedValue({}),
      }),
    },
  }));
  
  describe("POST /api/savecode", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    it("should save the code snippet and return success message", async () => {
      const req = {
        json: vi.fn().mockResolvedValue({
          email: "test@example.com",
          prompt: "Generate a function",
          code: "function test() {}",
        }),
      };
  
      const response = await POST(req as any); // Pass only "req"
      const json = await response.json();
  
      expect(response.status).toBe(200);
      expect(json).toHaveProperty("message", "Image saved successfully!");
      expect(json).toHaveProperty("image");
      expect(json.image).toHaveProperty("_id", "code123");
    });
  });