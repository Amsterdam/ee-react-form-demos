import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AmsterdamTicTacToeLoader from './AmsterdamTicTacToeLoader';

describe('AmsterdamTicTacToeLoader', () => {
  it('renders the loading message', () => {
    render(<AmsterdamTicTacToeLoader />);

    expect(screen.getByText(/even geduld/i)).toBeInTheDocument();
  });
});
