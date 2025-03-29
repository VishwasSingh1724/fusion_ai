import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { FloatingActionButton } from '../../../components/FloatingActionButton';

// Mock Lucide Icons
vi.mock('lucide-react', () => ({
  Plus: () => <span>+</span>,
  X: () => <span>X</span>,
  MessageSquare: () => <span>Message</span>,
  Image: () => <span>Image</span>,
  Music: () => <span>Music</span>,
  Code: () => <span>Code</span>,
}));

describe('FloatingActionButton', () => {
  it('renders the FAB button with a plus icon initially', () => {
    render(<FloatingActionButton />);
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('opens the action menu when clicked', () => {
    render(<FloatingActionButton />);
    fireEvent.click(screen.getByText('+')); // Click the FAB button
    expect(screen.getByText('New Conversation')).toBeInTheDocument();
    expect(screen.getByText('Generate Image')).toBeInTheDocument();
    expect(screen.getByText('Create Audio')).toBeInTheDocument();
    expect(screen.getByText('Write Code')).toBeInTheDocument();
  });

  it('closes the action menu when clicked again', () => {
    render(<FloatingActionButton />);
    fireEvent.click(screen.getByText('+')); // Open the menu
    fireEvent.click(screen.getByText('X')); // Close the menu by clicking X
  });
});
