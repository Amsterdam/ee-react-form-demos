import { render, screen, fireEvent } from '@testing-library/react';
import StepIntro from './StepIntro';

describe('ReactHookForm / BookingFormZod - StepIntro', () => {
  it('renders the headings and steps', () => {
    render(<StepIntro onButtonClick={vi.fn()} />);

    expect(
      screen.getByRole('heading', {
        name: /waar u dit formulier voor gebruikt/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /de stappen in dit formulier/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/met dit formulier maakt u een afspraak/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/uw gegevens/i)).toBeInTheDocument();

    expect(screen.getAllByText(/afspraak/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/controleren/i)).toBeInTheDocument();
  });

  it('calls onButtonClick when the link is clicked', () => {
    const handleClick = vi.fn();
    render(<StepIntro onButtonClick={handleClick} />);

    const link = screen.getByRole('link', { name: /start het formulier/i });

    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
