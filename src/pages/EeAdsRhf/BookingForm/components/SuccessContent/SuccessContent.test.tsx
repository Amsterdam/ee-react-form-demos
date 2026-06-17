import { render, screen } from '@testing-library/react';
import SuccessContent from './SuccessContent';

describe('Examples / BookingForm - SuccessContent', () => {
  it('renders the success message', () => {
    render(<SuccessContent />);

    expect(screen.getByText(/afspraak maken/i)).toBeInTheDocument();
    expect(screen.getByText(/dank u voor uw inzending/i)).toBeInTheDocument();
  });
});
