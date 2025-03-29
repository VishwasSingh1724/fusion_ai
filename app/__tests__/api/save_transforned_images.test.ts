import request from 'supertest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../../api/(api-routes)/save-transformed-image/route';
import DbConnect from '@/db/DbConnection';
import { User } from '@/db/models/user.model';
import TransformedImageSchema from '@/db/models/transformes-image.model';

// Mock DB connection
vi.mock('@/db/DbConnection', () => ({
  default: vi.fn(),
}));

// Mock models
vi.mock('@/db/models/user.model', () => ({
  User: {
    findOne: vi.fn(),
  },
}));

vi.mock('@/db/models/transformes-image.model', () => ({
  default: {
    create: vi.fn(),
  },
}));

describe('POST /api/save-transformed-image', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should save transformed image successfully', async () => {
    // Mock database connection
    (DbConnect as any).mockResolvedValueOnce(null);

    // Mock user
    const mockUser = {
      _id: 'user123',
      email: 'test@example.com',
      transformedImages: [],
      save: vi.fn(),
    };
    (User.findOne as any).mockResolvedValueOnce(mockUser);

    // Mock transformed image creation
    const mockTransformedImage = { _id: 'image123', title: 'Transformed Art', url: 'http://example.com/image.png' };
    (TransformedImageSchema.create as any).mockResolvedValueOnce(mockTransformedImage);

    // Simulate request
    const req = new Request('http://localhost/api/save-transformed-image', {
      method: 'POST',
      body: JSON.stringify({ title: 'Transformed Art', url: 'http://example.com/image.png', email: 'test@example.com' }),
    });

    const response = await POST(req);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toHaveProperty('message', 'Transformed Image saved successfully!');
    expect(result).toHaveProperty('image');
    expect(mockUser.transformedImages).toContain(mockTransformedImage._id);
    expect(mockUser.save).toHaveBeenCalled();
  });
});
