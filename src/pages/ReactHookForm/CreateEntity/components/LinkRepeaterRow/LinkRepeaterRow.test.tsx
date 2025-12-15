import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useForm } from 'react-hook-form';
import LinkRepeaterRow from './LinkRepeaterRow';
import type { EntityFormData } from '../../schema';

const defaultLink = {
  url: 'https://example.com',
  title: 'Example Title',
  icon: 'dashboard',
};

const defaultProps = {
  index: 0,
  links: [defaultLink],
  removeItem: vi.fn(),
  errors: {},
};

const renderRow = ({ index, links, removeItem, errors } = defaultProps) => {
  const Wrapper = () => {
    const { control } = useForm<EntityFormData>({
      defaultValues: { links },
    });

    return (
      <LinkRepeaterRow
        control={control}
        index={index}
        errors={errors}
        removeItem={removeItem}
      />
    );
  };

  return render(<Wrapper />);
};

describe('LinkRepeaterRow', () => {
  it('renders heading and all fields', () => {
    renderRow();

    expect(
      screen.getByRole('heading', { name: /link 1/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/url/i)).toHaveValue('https://example.com');
    expect(screen.getByLabelText(/title/i)).toHaveValue('Example Title');
    expect(screen.getByLabelText(/icon/i)).toHaveValue('dashboard');
  });

  it('updates value on text input change', async () => {
    renderRow();

    const input = screen.getByLabelText('Title');
    await userEvent.clear(input);
    await userEvent.type(input, 'updated-value');

    expect((input as HTMLInputElement).value).toBe('updated-value');
  });

  it('calls removeItem when delete button is clicked', async () => {
    const removeItem = vi.fn();
    renderRow({ ...defaultProps, removeItem });
    // render(<LinkRepeaterRow {...defaultProps} removeItem={removeItem} />);

    await userEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(removeItem).toHaveBeenCalled();
  });
});
