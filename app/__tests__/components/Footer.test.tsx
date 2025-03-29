import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Footer from '../../../components/Footer';
// Mock the icons used in the Footer component
vi.mock('lucide-react', () => ({
  ArrowUpRight: () => <span>↑</span>,
  Twitter: () => <span>Twitter Icon</span>,
  Github: () => <span>GitHub Icon</span>,
  Linkedin: () => <span>LinkedIn Icon</span>,
}));

describe('Footer Component', () => {
  it('renders the footer title and description', () => {
    render(<Footer />);
    expect(screen.getByText('FUSION AI')).toBeInTheDocument();
    expect(screen.getByText(/Empowering the future through artificial intelligence/)).toBeInTheDocument();
  });

  it('renders social media icons and links', () => {
    render(<Footer />);

    // Check social media links
    expect(screen.getByText('Twitter Icon')).toBeInTheDocument();
    expect(screen.getByText('GitHub Icon')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn Icon')).toBeInTheDocument();
  });

  it('renders the quick links sections', () => {
    render(<Footer />);

    // Check the Product section
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('API')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();

    // Check the Company section
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
    expect(screen.getByText('Press')).toBeInTheDocument();

    // Check the Resources section
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();
    expect(screen.getByText('Partners')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // Check the Legal section
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('Cookies')).toBeInTheDocument();
  });

  it('renders the "Back to top" button', () => {
    render(<Footer />);

    const backToTopButton = screen.getByText('Back to top');
    expect(backToTopButton).toBeInTheDocument();
    
    fireEvent.click(backToTopButton); // Simulate button click
  });
});
