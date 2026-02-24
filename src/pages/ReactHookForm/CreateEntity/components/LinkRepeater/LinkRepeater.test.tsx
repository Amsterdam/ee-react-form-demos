import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useFieldArray, useForm } from 'react-hook-form';
import type { EntityFormData } from '../../schema';
import LinkRepeater from './LinkRepeater';
import userEvent from '@testing-library/user-event';

export const renderLinkRepeater = (
  defaultLinks = [
    {
      url: 'https://example.com',
      title: 'Example',
      icon: 'launch',
    },
  ]
) => {
  const Wrapper = () => {
    const { control } = useForm<EntityFormData>({
      defaultValues: {
        links: defaultLinks,
      },
    });

    const {
      fields,
      append,
      remove,
      // insert, swap, etc., if needed later
    } = useFieldArray({
      control,
      name: 'links',
    });

    return (
      <LinkRepeater
        fields={fields}
        append={append}
        remove={remove}
        control={control}
        errors={[]}
      />
    );
  };

  return render(<Wrapper />);
};

describe('LinkRepeater', () => {
  it('renders heading and description', () => {
    renderLinkRepeater();

    expect(screen.getAllByRole('heading', { level: 4 })[0]).toHaveTextContent(
      'Links'
    );
    expect(
      screen.getByText(/a list of external hyperlinks related to the entity/i)
    ).toBeInTheDocument();
  });

  it('renders all link rows from defaultValues', () => {
    renderLinkRepeater([
      {
        url: 'https://example1.com',
        title: 'First Link',
        icon: 'launch',
      },
      {
        url: 'https://example2.com',
        title: 'Second Link',
        icon: 'github',
      },
    ]);

    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 2')).toBeInTheDocument();
  });

  it('adds a new link on button click', async () => {
    const { container } = renderLinkRepeater();

    const before = container.querySelectorAll('input[name^="links."]');
    expect(before.length).toBe(2);

    const addButton = screen.getByRole('button', {
      name: /add a new link/i,
    });

    await userEvent.click(addButton);

    const after = container.querySelectorAll('input[name^="links."]');
    expect(after.length).toBe(4);
  });

  it('removes a link row on delete click', async () => {
    renderLinkRepeater([
      {
        url: 'https://example.com',
        title: 'To Be Removed',
        icon: 'launch',
      },
      {
        url: 'https://example2.com',
        title: 'Stay',
        icon: 'github',
      },
    ]);

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(deleteButtons.length).toBe(2);

    await userEvent.click(deleteButtons[0]);

    expect(screen.queryByText('To Be Removed')).not.toBeInTheDocument();
  });
});
