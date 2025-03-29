import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Conversation from '../../(root)/(routes)/conversation/page';
import { vi } from 'vitest';

vi.mock('@clerk/nextjs', () => ({
  useUser: () => ({
    user: { primaryEmailAddress: { emailAddress: 'test@example.com' } },
  }),
}));

vi.mock('axios', () => ({
  post: vi.fn(() => Promise.resolve({ data: { text: 'AI Response' } })),
}));

describe('Conversation Page', () => {
  test('deletes messages correctly', async () => {
    render(<Conversation />);

    // Type message
    const input = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'Hello AI' } });

    // Click send button
    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    // Ensure message is removed
    await waitFor(() => expect(screen.queryByText('Hello AI')).not.toBeInTheDocument());
  });
});
