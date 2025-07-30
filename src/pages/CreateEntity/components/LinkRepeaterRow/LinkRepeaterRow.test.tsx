import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import LinkRepeaterRow from './LinkRepeaterRow';

describe('LinkRepeaterRow', () => {
  const defaultProps = {
    index: 0,
    item: {
      url: 'https://example.com',
      title: 'Example Title',
      icon: 'dashboard',
    },
    onChange: vi.fn(),
    removeItem: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders heading and all fields', () => {
    render(<LinkRepeaterRow {...defaultProps} />);

    expect(
      screen.getByRole('heading', { name: /link 1/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/url/i)).toHaveValue('https://example.com');
    expect(screen.getByLabelText(/title/i)).toHaveValue('Example Title');
    expect(screen.getByLabelText(/icon/i)).toHaveValue('dashboard');
  });

  it('calls onChange when URL, title, or icon changes', async () => {
    const { onChange } = defaultProps;
    render(<LinkRepeaterRow {...defaultProps} />);
    // const user = userEvent.setup();

    const urlInput = screen.getByLabelText(/url/i);
    fireEvent.change(urlInput, {
      target: { value: 'https://example.com/foo' },
    });
    expect(onChange).toHaveBeenLastCalledWith('url', 'https://example.com/foo');

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    expect(onChange).toHaveBeenLastCalledWith('title', 'New Title');

    const iconSelect = screen.getByLabelText(/icon/i);
    fireEvent.change(iconSelect, { target: { value: 'github' } });
    expect(onChange).toHaveBeenLastCalledWith('icon', 'github');
  });

  it('calls removeItem when delete button is clicked', async () => {
    const removeItem = vi.fn();
    render(<LinkRepeaterRow {...defaultProps} removeItem={removeItem} />);

    await userEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(removeItem).toHaveBeenCalled();
  });
});
