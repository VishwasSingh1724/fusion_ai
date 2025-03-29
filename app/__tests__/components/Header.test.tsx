import { render, screen } from '@testing-library/react';
import Header from '../../../components/Header';
import { Github } from 'lucide-react';
import { vi } from 'vitest';

// Mock the LucideIcon component for testing purposes
vi.mock('lucide-react', () => ({
  Github: () => <span>GitHub Icon</span>,
}));

describe('Header Component', () => {
  it('renders the title and description correctly', () => {
    render(
      <Header 
        title="Test Title" 
        description="This is a test description." 
        icon={Github} 
        iconColor="blue" 
        bgColor="purple" 
      />
    );

    // Check that the title and description are rendered
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
  });

  it('renders the correct icon with the proper color', () => {
    render(
      <Header 
        title="Test Title" 
        description="This is a test description." 
        icon={Github} 
        iconColor="blue" 
        bgColor="purple" 
      />
    );

    // Check if the icon is rendered correctly
    expect(screen.getByText('GitHub Icon')).toBeInTheDocument();
  });

  it('applies the correct background color to the icon container', () => {
    render(
      <Header 
        title="Test Title" 
        description="This is a test description." 
        icon={Github} 
        iconColor="blue" 
        bgColor="purple" 
      />
    );

    // Check if the icon container has the correct background color class
    expect(screen.getByText('GitHub Icon').parentElement).toHaveClass('bg-purple-500/20');
  });
});
