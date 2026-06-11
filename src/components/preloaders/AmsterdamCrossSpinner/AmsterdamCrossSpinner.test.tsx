import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AmsterdamCrossSpinner from './AmsterdamCrossSpinner';

describe('AmsterdamCrossSpinner', () => {
  it('renders three spinner icons', () => {
    const { container } = render(<AmsterdamCrossSpinner />);

    expect(container.querySelectorAll('svg')).toHaveLength(3);
  });
});
