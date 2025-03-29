import { render, screen, fireEvent } from '@testing-library/react';
import PricingComponent from '../../../components/Pricing';
import { vi } from 'vitest'; // Import vi for mocking
import { Check } from 'lucide-react';

// Mock `Check` icon
vi.mock('lucide-react', () => ({
  __esModule: true,
  Check: () => <svg data-testid="check-icon" />,
}));

describe('PricingComponent', () => {
  it('renders pricing plans correctly', () => {
    render(<PricingComponent />);
    expect(screen.getByText('Simple, transparent pricing')).toBeInTheDocument();
    expect(screen.getByText('Choose the plan that\'s right for you')).toBeInTheDocument();
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders correct pricing for monthly plan by default', () => {
    render(<PricingComponent />);
    expect(screen.getByText('₹0')).toBeInTheDocument(); // Basic Plan
    expect(screen.getByText('₹19')).toBeInTheDocument(); // Pro Plan
    expect(screen.getByText('₹49')).toBeInTheDocument(); // Enterprise Plan

  });

  it('switches to annual pricing when toggle is checked', () => {
    render(<PricingComponent />);

    const toggle = screen.getByRole('checkbox');
    fireEvent.click(toggle); // Simulate switching to annual
    expect(screen.getByText('₹99')).toBeInTheDocument(); // Basic Plan (annual)
    expect(screen.getByText('₹199')).toBeInTheDocument(); // Pro Plan (annual)
    expect(screen.getByText('₹499')).toBeInTheDocument(); // Enterprise Plan (annual)
  });
})