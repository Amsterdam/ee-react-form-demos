import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Header from './Header';

describe('Header', () => {
  it('renders the component', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(container.firstChild).toBeDefined();
  });
});
