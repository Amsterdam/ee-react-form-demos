import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Loader from './Loader';

afterEach(() => {
  vi.restoreAllMocks();
  document.body.style.overflow = '';
});

describe('Loader', () => {
  it('renders a status region with the default label', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    render(<Loader />);

    expect(
      screen.getByRole('status', { name: /bezig met verzenden/i })
    ).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status').querySelectorAll('svg')).toHaveLength(3);
  });

  it('renders one of the alternate preloaders', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99);

    render(<Loader />);

    expect(screen.getByText(/even geduld/i)).toBeInTheDocument();
  });

  it('locks body scroll while mounted and restores it on unmount', () => {
    document.body.style.overflow = 'auto';

    const { unmount } = render(<Loader />);

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('auto');
  });

  it('renders a status region with a custom label and children', () => {
    render(
      <Loader label="Bezig met laden">
        <div>Loader</div>
      </Loader>
    );

    expect(
      screen.getByRole('status', { name: /bezig met laden/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Loader')).toBeInTheDocument();
  });
});
