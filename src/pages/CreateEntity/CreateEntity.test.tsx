import { render } from '@testing-library/react';
import CreateEntity from './CreateEntity';

describe('CreateEntity', () => {
  it('renders the component', () => {
    const { container } = render(<CreateEntity />);
    expect(container.firstChild).toBeDefined();
  });

  it('has the expected content', () => {
    const { container } = render(<CreateEntity />);
    expect(container.textContent?.trim()).toEqual('Home');
  });
});
