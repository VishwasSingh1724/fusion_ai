import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../../api/(api-routes)/user-data/route';
import DbConnect from '@/db/DbConnection';
import { User } from '@/db/models/user.model';
import Image from '@/db/models/image.model';
import MusicModel from '@/db/models/music.models';
import CodeModel from '@/db/models/code.model';
import ConversationModel from '@/db/models/conversation.model';
import TransformedImageModel from '@/db/models/transformes-image.model';

// Mock DB connection
vi.mock('@/db/DbConnection', () => ({
  default: vi.fn(),
}));

// Mock Models
vi.mock('@/db/models/user.model', () => ({
  User: {
    findOne: vi.fn(),
    findById: vi.fn().mockReturnValue({
      populate: vi.fn().mockReturnThis(), // Ensures populate() chains properly
    }),
  },
}));

vi.mock('@/db/models/image.model', () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock('@/db/models/music.models', () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock('@/db/models/code.model', () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock('@/db/models/conversation.model', () => ({
  default: {
    find: vi.fn(),
  },
}));

vi.mock('@/db/models/transformes-image.model', () => ({
  default: {
    find: vi.fn(),
  },
}));

describe('POST /api/get-user-data', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return populated user data', async () => {
    (DbConnect as any).mockResolvedValueOnce(null);

    const mockUser = { _id: 'user123', email: 'test@example.com' };
    (User.findOne as any).mockResolvedValueOnce(mockUser);

    const populatedUser = {
      _id: 'user123',
      images: [{ _id: 'image1' }],
      musics: [{ _id: 'music1' }],
      code: [{ _id: 'code1' }],
      conversation: [{ _id: 'conversation1' }],
      transformedImages: [{ _id: 'transformedImage1' }],
    };

    // Ensure populate() correctly returns the expected populated user
    (User.findById as any).mockReturnValue({
      populate: vi.fn().mockResolvedValueOnce(populatedUser),
    });

    const req = new Request('http://localhost/api/get-user-data', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    const response = await POST(req);
    expect(response).toBeDefined();
  });
});
