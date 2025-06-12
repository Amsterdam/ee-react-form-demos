import { ChangeEvent } from 'react';
import ANNOTATIONS from '@/utils/getAnnotations';
import InputAutoSelect from '@/components/InputAutoSelect/InputAutoSelect';
import {
  Button,
  Field,
  Heading,
  Label,
  Select,
  TextInput,
} from '@amsterdam/design-system-react';
import { TrashBinIcon } from '@amsterdam/design-system-react-icons';
import styles from './AnnotationRow.module.css';
import { Control, Controller, FieldErrors, useWatch } from 'react-hook-form';
import { EntityFormData } from '@/types';

interface AnnotationRowProps {
  control: Control<EntityFormData>;
  index: number;
  removeItem: () => void;
  errors: FieldErrors<EntityFormData>;
  setValue: UseFormSetValue<EntityFormData>;
}

const AnnotationRow = ({
  control,
  index,
  removeItem,
  errors,
  setValue,
}: AnnotationRowProps) => {
  // Watch the current annotation key to determine what type of value input to show
  const annotationKey = useWatch({
    control,
    name: `annotations.${index}.key`,
  });

  const annotation = ANNOTATIONS.find(
    annotation => annotation.key === annotationKey
  );

  return (
    <Field className={styles.container}>
      <Heading level={4}>Annotation {index + 1}</Heading>

      <Controller
        name={`annotations.${index}.key`}
        control={control}
        render={({ field }) => {
          const selectedOption = ANNOTATIONS.map(({ key, label }) => ({
            value: key,
            label,
          })).find(option => option.value === field.value);

          return (
            <>
              <Label htmlFor={`annotation-type-${index}`}>Type</Label>
              <InputAutoSelect
                options={ANNOTATIONS.map(({ key, label }) => ({
                  value: key,
                  label,
                }))}
                id={`annotation-type-${index}`}
                value={selectedOption}
                required
                aria-describedby="annotations-description"
                onChange={(newValue: unknown | null) => {
                  if (newValue) {
                    const selectedKey = (newValue as { value: string }).value;
                    const rule = ANNOTATIONS.find(a => a.key === selectedKey);
                    const defaultValue = rule?.values ? rule.values[0] : '';

                    // Update both key and value
                    field.onChange(selectedKey);
                    // Also update the value field
                    setValue(`annotations.${index}.value`, defaultValue);
                  } else {
                    field.onChange('');
                    setValue(`annotations.${index}.value`, '');
                  }
                }}
              />
              {errors.annotations?.[index]?.key && (
                <div className="error-text">
                  {errors.annotations[index]?.key?.message}
                </div>
              )}
            </>
          );
        }}
      />

      <Controller
        name={`annotations.${index}.value`}
        control={control}
        render={({ field }) => (
          <>
            <Label htmlFor={`annotation-value-${index}`}>Value</Label>
            {annotation?.values ? (
              <Select
                id={`annotation-value-${index}`}
                className="style-mb-m"
                value={field.value}
                required
                aria-describedby="annotations-description"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  field.onChange(e.target.value);
                }}
              >
                {annotation.values.map((value, valueIndex) => (
                  <Select.Option
                    value={value}
                    key={`${annotationKey}-${valueIndex}`}
                  >
                    {value}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <TextInput
                type={annotation?.type === 'url' ? 'url' : 'text'}
                id={`annotation-value-${index}`}
                placeholder={
                  annotation?.example ? annotation.example : undefined
                }
                value={field.value}
                required
                className="style-mb-m"
                aria-describedby="annotations-description"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
            {errors.annotations?.[index]?.value && (
              <div className="error-text">
                {errors.annotations[index]?.value?.message}
              </div>
            )}
          </>
        )}
      />

      <div className="style-mb-m">
        <Button
          icon={TrashBinIcon}
          iconBefore
          variant="tertiary"
          onClick={removeItem}
        >
          Delete
        </Button>
      </div>
    </Field>
  );
};

export default AnnotationRow;
