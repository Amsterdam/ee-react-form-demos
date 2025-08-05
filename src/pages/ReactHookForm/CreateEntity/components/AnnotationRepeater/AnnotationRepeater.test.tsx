import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import AnnotationRepeater from './AnnotationRepeater';
import { EntityFormData } from '../../schema';
import { useForm } from 'react-hook-form';

const renderWithForm = (
  defaultAnnotations = [{ key: 'foo', value: 'bar' }]
) => {
  const Wrapper = () => {
    const {
      control,
      setValue,
      formState: { errors },
    } = useForm<EntityFormData>({
      defaultValues: {
        annotations: defaultAnnotations,
      },
    });

    return (
      <AnnotationRepeater
        control={control}
        errors={errors}
        setValue={setValue}
      />
    );
  };

  return render(<Wrapper />);
};

describe('AnnotationRepeater', () => {
  it('renders, heading and description', async () => {
    renderWithForm();

    expect(screen.getAllByRole('heading', { level: 4 })[0]).toHaveTextContent(
      'Annotations'
    );
    expect(
      screen.getByText(/An object with arbitrary non-identifying metadata/)
    ).toBeInTheDocument();
  });

  it('renders all existing annotation rows', () => {
    renderWithForm([
      { key: 'key1', value: 'val1' },
      { key: 'key2', value: 'val2' },
    ]);

    expect(screen.getByText('Annotation 1')).toBeInTheDocument();
    expect(screen.getByText('Annotation 2')).toBeInTheDocument();
  });

  it('adds a new annotation on button click', async () => {
    renderWithForm([
      { key: 'key1', value: 'val1' },
      { key: 'key2', value: 'val2' },
    ]);

    const addButton = screen.getByRole('button', {
      name: /add a new annotation/i,
    });

    await userEvent.click(addButton);

    // A third row should now be rendered
    expect(screen.getByText('Annotation 3')).toBeInTheDocument();
  });

  it('removes an annotation when delete is clicked', async () => {
    renderWithForm([
      { key: 'key1', value: 'val1' },
      { key: 'key2', value: 'val2' },
    ]);

    // Confirm both annotations are visible
    expect(screen.getByText('Annotation 1')).toBeInTheDocument();
    expect(screen.getByText('Annotation 2')).toBeInTheDocument();

    // Click the second delete button
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await userEvent.click(deleteButtons[1]);

    // Only one annotation should remain
    expect(screen.queryByText('Annotation 2')).not.toBeInTheDocument();
  });

  it('updates the value field when user types', async () => {
    renderWithForm([{ key: 'github.com/project-slug', value: 'org/app-name' }]);

    const input = screen.getByLabelText('Value');
    await userEvent.clear(input);
    await userEvent.type(input, 'updated-value');

    expect((input as HTMLInputElement).value).toBe('updated-value');
  });
});
