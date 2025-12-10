import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import LinkRepeater from './LinkRepeater';

describe('LinkRepeater', () => {
  const baseItems = [
    { url: 'https://a.com', title: 'A', icon: 'dashboard' },
    { url: 'https://b.com', title: 'B', icon: 'book' },
  ];

  it('renders heading, description and error', async () => {
    const onChangeMock = vi.fn();
    const onValidateFieldMock = vi.fn();

    render(
      <LinkRepeater
        items={baseItems}
        onChange={onChangeMock}
        onValidateField={onValidateFieldMock}
        errors={{ links: 'Links are required' }}
      />
    );

    expect(screen.getByRole('heading', { name: /links/i })).toBeInTheDocument();
    expect(
      screen.getByText(/a list of external hyperlinks/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Links are required')).toBeInTheDocument();
  });

  it('renders all link rows', async () => {
    vi.resetModules();
    vi.doMock('../LinkRepeaterRow/LinkRepeaterRow', () => ({
      default: ({ index }: { index: number }) => (
        <div data-testid={`row-${index}`}>Mock Row {index}</div>
      ),
    }));

    const { default: LinkRepeater } = await import('./LinkRepeater');

    const onChangeMock = vi.fn();
    const onValidateFieldMock = vi.fn();

    render(
      <LinkRepeater
        items={baseItems}
        onChange={onChangeMock}
        onValidateField={onValidateFieldMock}
      />
    );

    expect(screen.getByTestId('row-0')).toBeInTheDocument();
    expect(screen.getByTestId('row-1')).toBeInTheDocument();
  });

  it('adds a new link on button click', async () => {
    const onChangeMock = vi.fn();
    const onValidateFieldMock = vi.fn();

    render(
      <LinkRepeater
        items={baseItems}
        onChange={onChangeMock}
        onValidateField={onValidateFieldMock}
      />
    );
    const addButton = screen.getByRole('button', { name: /add a new link/i });
    await userEvent.click(addButton);

    expect(onChangeMock).toHaveBeenCalledWith([
      ...baseItems,
      { url: '', title: '', icon: 'dashboard' },
    ]);

    expect(onValidateFieldMock).toHaveBeenCalledWith('links', [
      ...baseItems,
      { url: '', title: '', icon: 'dashboard' },
    ]);
  });

  it('removes a link item when removeItem is called', async () => {
    const onChangeMock = vi.fn();
    const onValidateFieldMock = vi.fn();

    render(
      <LinkRepeater
        items={baseItems}
        onChange={onChangeMock}
        onValidateField={onValidateFieldMock}
      />
    );

    const buttons = screen.getAllByText('Delete', { selector: 'button' });
    await userEvent.click(buttons[buttons.length - 1]);

    expect(onChangeMock).toHaveBeenCalledWith([baseItems[0]]);
    expect(onValidateFieldMock).toHaveBeenCalledWith('links', [baseItems[0]]);
  });

  it('updates a link item when onChange is called from child', async () => {
    const onChangeMock = vi.fn();
    const onValidateFieldMock = vi.fn();

    render(
      <LinkRepeater
        items={baseItems}
        onChange={onChangeMock}
        onValidateField={onValidateFieldMock}
      />
    );

    const input = screen.getAllByLabelText('Title')[0];
    fireEvent.change(input, { target: { value: 'Updated title' } });

    expect(onChangeMock).toHaveBeenCalledWith([
      { ...baseItems[0], title: 'Updated title' },
      baseItems[1],
    ]);

    expect(onValidateFieldMock).toHaveBeenCalledWith(
      'links.0.title',
      'Updated title'
    );
  });
});
