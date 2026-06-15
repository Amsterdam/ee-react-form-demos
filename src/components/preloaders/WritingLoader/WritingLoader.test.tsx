import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WritingLoader from './WritingLoader';

describe('WritingLoader', () => {
  it('renders the loading message', () => {
    render(<WritingLoader />);

    expect(screen.getByText(/even geduld/i)).toBeInTheDocument();
  });
});
