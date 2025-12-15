import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useForm } from 'react-hook-form';
import AnnotationRepeaterRow from './AnnotationRepeaterRow';
import type { EntityFormData } from '../../schema';

const defaultAnnotation = {
  key: 'github.com/project-slug',
  value: 'org/app-name',
};

const renderRow = ({
  index = 0,
  annotations = [defaultAnnotation],
  errors = {},
  setValue = vi.fn(),
  removeItem = vi.fn(),
} = {}) => {
  const Wrapper = () => {
    const { control } = useForm<EntityFormData>({
      defaultValues: { annotations },
    });

    return (
      <AnnotationRepeaterRow
        control={control}
        index={index}
        errors={errors}
        setValue={setValue}
        removeItem={removeItem}
      />
    );
  };

  return render(<Wrapper />);
};

describe('AnnotationRepeaterRow', () => {
  it('renders annotation row with heading and inputs', () => {
    renderRow();

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Annotation 1'
    );
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Value')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('renders key and value errors', () => {
    const errors = {
      annotations: [
        {
          key: { message: 'Key error' },
          value: { message: 'Value error' },
        },
      ],
    };

    renderRow({ errors });

    expect(screen.getByText('Key error')).toBeInTheDocument();
    expect(screen.getByText('Value error')).toBeInTheDocument();
  });

  it('updates key and sets default value when key changes', async () => {
    const setValue = vi.fn();

    renderRow({ setValue });

    // simulate selecting a new annotation type via react-select replacement
    const selectInput = screen.getByLabelText('Type');
    await userEvent.click(selectInput); // open the dropdown

    // simulate typing + selecting an option
    await userEvent.type(selectInput, 'github.com/team-slug');
    await userEvent.keyboard('[Enter]');

    // `setValue` should be called to update the value field too
    expect(setValue).toHaveBeenCalledWith(
      'annotations.0.value',
      expect.any(String)
    );
  });

  it('updates value on text input change', async () => {
    renderRow();

    const input = screen.getByLabelText('Value');
    await userEvent.clear(input);
    await userEvent.type(input, 'updated-value');

    expect((input as HTMLInputElement).value).toBe('updated-value');
  });

  it('updates value when select input is changed', async () => {
    // Use an annotation with a known set of values
    renderRow({
      annotations: [
        {
          key: 'backstage.io/source-location',
          value: 'https://github.com/org/app-name/',
        },
      ],
    });

    const select = screen.getByLabelText('Value');
    fireEvent.change(select, { target: { value: 'https://new.url' } });

    expect((select as HTMLSelectElement).value).toBe('https://new.url');
  });

  it('calls removeItem when delete button is clicked', async () => {
    const removeItem = vi.fn();

    renderRow({ removeItem });

    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteBtn);

    expect(removeItem).toHaveBeenCalled();
  });
});
