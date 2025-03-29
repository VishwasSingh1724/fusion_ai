import { POST } from "../../api/(api-routes)/save-conversation/route"; // Adjust path if needed
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/db/DbConnection", () => ({
  default: vi.fn(),
}));

vi.mock("@/db/models/user.model", () => ({
  User: {
    findOne: vi.fn().mockResolvedValue({
      _id: "user123",
      email: "test@example.com",
      conversation: [],
      save: vi.fn(),
    }),
  },
}));

vi.mock("@/db/models/conversation.model", () => ({
  default: {
    create: vi.fn().mockResolvedValue({
      _id: "conv123",
      userChat: "Hello AI",
      AiChat: "Hello User",
      userId: "user123",
      populate: vi.fn().mockResolvedValue({}),
    }),
  },
}));

describe("POST /api/saveconversation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should save the conversation and return success message", async () => {
    const req = new Request("http://localhost/api/saveconversation", {
      method: "POST", // ✅ Explicitly setting POST method
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        userChat: "Hello AI",
        AiChat: "Hello User",
      }),
    });

    const response = await POST(req as any); // Fix: Ensure req is correctly formatted
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toHaveProperty("message", "Message saved successfully!");
    expect(json).toHaveProperty("data");
    expect(json.data).toHaveProperty("_id", "conv123");
  });
});
