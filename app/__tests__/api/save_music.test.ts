import request from 'supertest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../../api/(api-routes)/save-music/route';
import DbConnect from '@/db/DbConnection';
import { User } from '@/db/models/user.model';
import MusicSchema from '@/db/models/music.models';

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

vi.mock('@/db/models/music.models', () => ({
  default: {
    create: vi.fn(),
  },
}));

describe('POST /api/save-music', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should save music successfully', async () => {
    // Mock database connection
    (DbConnect as any).mockResolvedValueOnce(null);

    // Mock user
    const mockUser = {
      _id: 'user123',
      email: 'test@example.com',
      musics: [],
      save: vi.fn(),
    };
    (User.findOne as any).mockResolvedValueOnce(mockUser);

    // Mock music creation
    const mockMusic = { _id: 'music123', title: 'Test Song', url: 'http://example.com/song.mp3' };
    (MusicSchema.create as any).mockResolvedValueOnce(mockMusic);

    // Simulate request
    const req = new Request('http://localhost/api/save-image', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test Song', url: 'http://example.com/song.mp3', email: 'test@example.com' }),
    });

    const response = await POST(req);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toHaveProperty('message', 'Music saved successfully!');
    expect(result).toHaveProperty('image');
    expect(mockUser.musics).toContain(mockMusic._id);
    expect(mockUser.save).toHaveBeenCalled();
  });
});
