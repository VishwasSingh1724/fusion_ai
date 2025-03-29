import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../../api/(api-routes)/update-credits/route';
import { User } from '@/db/models/user.model';

// Mock User model
vi.mock('@/db/models/user.model', () => ({
  User: {
    findOneAndUpdate: vi.fn(),
  },
}));

describe('POST /api/update-credits', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully update user credits', async () => {
    // Mock the database update operation
    (User.findOneAndUpdate as any).mockResolvedValueOnce(null);

    // Simulate request
    const req = new Request('http://localhost/api/update-credits', {
      method: 'POST',
      body: JSON.stringify({ clerkId: 'clerk123', amount: 10 }),
    });

    const response = await POST(req);
    const result = await response.json();

    // Assertions
    expect(response.status).toBe(200);
    expect(result).toEqual({ success: true });
    expect(User.findOneAndUpdate).toHaveBeenCalledWith(
      { clerkId: 'clerk123' },
      { $inc: { credits: 10 } }
    );
  });
});
