import { ChangeEvent, useCallback, useMemo } from 'react';
import {
  Button,
  Field,
  Heading,
  Label,
  Select,
  TextInput,
} from '@amsterdam/design-system-react';
import { TrashBinIcon } from '@amsterdam/design-system-react-icons';
import ANNOTATIONS from '@/utils/getAnnotations';
import InputAutoSelect from '../../../../components/InputAutoSelect/InputAutoSelect';
import styles from './AnnotationRepeaterRow.module.css';
import { AnnotationItem } from '@/types/types';
import clsx from 'clsx';

interface AnnotationRepeaterRowProps {
  index: number;
  removeItem?: () => void;
  onChange: (key: string, value: string) => void;
  values: AnnotationItem;
  keyError?: string;
  valueError?: string;
}

const AnnotationRepeaterRow = ({
  index,
  removeItem = undefined,
  onChange,
  values,
  keyError,
  valueError,
}: AnnotationRepeaterRowProps) => {
  const annotation = ANNOTATIONS.find(
    annotation => annotation.key === values.key
  );
  const keyOptions = useMemo(
    () =>
      ANNOTATIONS.map(({ key, label }) => ({
        value: key,
        label,
      })),
    []
  );
  const keyValue = useMemo(
    () =>
      ANNOTATIONS.map(({ key, label }) => ({
        value: key,
        label,
      })).find(option => option.value === values.key),
    [values]
  );
  const keyOnChange = useCallback(
    (selectedOption: unknown | null) => {
      if (selectedOption) {
        const selectedKey = (selectedOption as { value: string }).value;
        const rule = ANNOTATIONS.find(a => a.key === selectedKey);
        const defaultValue = rule?.values ? rule.values[0] : '';

        onChange(selectedKey, defaultValue);
      } else {
        onChange('', '');
      }
    },
    [onChange]
  );

  return (
    <Field className={styles.container} invalid={!!keyError || !!valueError}>
      <Heading level={4}>Annotation {index + 1}</Heading>
      <Label htmlFor={`annotation-type-${index}`}>Type</Label>
      <InputAutoSelect
        options={keyOptions}
        id={`annotation-type-${index}`}
        value={keyValue}
        required
        error={keyError}
        aria-describedby={clsx('annotations-description', {
          [`annotation-type-${index}-error`]: keyError,
        })}
        onChange={keyOnChange}
      />

      <Label htmlFor={`annotation-value-${index}`}>Value</Label>

      {annotation?.values ? (
        <Select
          id={`annotation-value-${index}`}
          className="ams-mb-m"
          value={values.value}
          required
          invalid={!!valueError}
          aria-describedby={clsx('annotations-description', {
            [`annotation-value-${index}-error`]: valueError,
          })}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            onChange(values.key, e.target.value || '');
          }}
        >
          {annotation.values.map((value, valueIndex) => (
            <Select.Option value={value} key={`${values.key}-${valueIndex}`}>
              {value}
            </Select.Option>
          ))}
        </Select>
      ) : (
        <TextInput
          type={annotation?.type === 'url' ? 'url' : 'text'}
          id={`annotation-value-${index}`}
          placeholder={annotation?.example ? annotation.example : undefined}
          value={values.value ?? ''}
          required
          invalid={!!valueError}
          className="ams-mb-m"
          aria-describedby={clsx('annotations-description', {
            [`annotation-value-${index}-error`]: valueError,
          })}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(values.key, e.target.value || '');
          }}
        />
      )}

      <div className="ams-mb-m">
        <Button
          icon={TrashBinIcon}
          iconBefore
          variant="tertiary"
          onClick={() => removeItem?.()}
        >
          Delete
        </Button>
      </div>
    </Field>
  );
};

export default AnnotationRepeaterRow;
