import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import AnnotationRepeater from './AnnotationRepeater';

describe('AnnotationRepeater', () => {
  it('renders, heading, description and error', async () => {
    render(
      <AnnotationRepeater
        items={[]}
        errors={{ annotations: 'Annotations error' }}
        onChange={() => {}}
      />
    );

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Annotations'
    );
    expect(
      screen.getByText(/An object with arbitrary non-identifying metadata/)
    ).toBeInTheDocument();
    expect(screen.getByText('Annotations error')).toBeInTheDocument();
  });

  it('renders all annotation rows', async () => {
    vi.resetModules();
    vi.doMock('../AnnotationRepeaterRow/AnnotationRepeaterRow', () => ({
      default: ({ index }: { index: number }) => (
        <div data-testid={`row-${index}`}>Mock Row {index}</div>
      ),
    }));

    // Dynamically import AFTER mocking
    const { default: AnnotationRepeater } = await import(
      './AnnotationRepeater'
    );

    const items = [
      { key: 'foo', value: 'bar' },
      { key: 'baz', value: 'qux' },
    ];
    render(
      <AnnotationRepeater items={items} errors={{}} onChange={() => {}} />
    );

    expect(screen.getByTestId('row-0')).toBeInTheDocument();
    expect(screen.getByTestId('row-1')).toBeInTheDocument();
  });

  it('adds new annotation on button click', async () => {
    const onChange = vi.fn();
    const items = [{ key: 'foo', value: 'bar' }];

    render(
      <AnnotationRepeater items={items} errors={{}} onChange={onChange} />
    );

    const addButton = screen.getByRole('button', {
      name: /add a new annotation/i,
    });
    await userEvent.click(addButton);

    expect(onChange).toHaveBeenCalledWith([...items, { key: '', value: '' }]);
  });

  it('calls onChange with item removed', async () => {
    const onChangeMock = vi.fn();
    const items = [
      { key: 'a', value: '1' },
      { key: 'b', value: '2' },
    ];

    render(
      <AnnotationRepeater items={items} errors={{}} onChange={onChangeMock} />
    );

    const buttons = screen.getAllByText('Delete', { selector: 'button' });
    await userEvent.click(buttons[buttons.length - 1]);
    expect(onChangeMock).toHaveBeenCalledWith([{ key: 'a', value: '1' }]);
  });

  it('updates annotation item on change', async () => {
    const onChangeMock = vi.fn();
    const items = [{ key: 'key', value: 'value' }];

    render(
      <AnnotationRepeater items={items} errors={{}} onChange={onChangeMock} />
    );

    const input = screen.getByLabelText('Value');
    await fireEvent.change(input, { target: { value: 'Updated' } });

    expect(onChangeMock).toHaveBeenCalledWith([
      { key: 'key', value: 'Updated' },
    ]);
  });
});
