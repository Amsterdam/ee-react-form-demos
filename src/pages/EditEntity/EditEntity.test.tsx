import { render } from '@testing-library/react';
import EditEntity from './EditEntity';

describe('EditEntity', () => {
  it('renders the component', () => {
    const { container } = render(<EditEntity />);
    expect(container.firstChild).toBeDefined();
  });

  // it('has the expected content', () => {
  //   const { container } = render(<EditEntity />);
  //   expect(container.textContent).toEqual('Contact');
  // });
});
