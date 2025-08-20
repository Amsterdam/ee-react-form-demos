import { render, screen } from '@testing-library/react';
import Loader from './Loader';

it('renders the component', () => {
  render(<Loader />);
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});
