import { render } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders the component', () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toBeDefined();
  });

  it('has the expected content', () => {
    const { container } = render(<Home />);
    expect(container.textContent?.trim()).toEqual('Home');
  });
});
