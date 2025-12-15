import { ChangeEvent, useCallback, useMemo } from 'react';
import {
  Button,
  ErrorMessage,
  Field,
  Heading,
  Label,
  Select,
  TextInput,
} from '@amsterdam/design-system-react';
import { TrashBinIcon } from '@amsterdam/design-system-react-icons';
import clsx from 'clsx';
import ANNOTATIONS from '@/utils/getAnnotations';
import { AnnotationItem } from '@/types/types';
import InputAutoSelect from '../../../../components/InputAutoSelect/InputAutoSelect';
import styles from './AnnotationRepeaterRow.module.css';

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
      <Label htmlFor={`annotations-${index}-type`}>Type</Label>
      {keyError && (
        <ErrorMessage id={`annotations-${index}-type-error`}>
          {keyError}
        </ErrorMessage>
      )}
      <InputAutoSelect
        options={keyOptions}
        id={`annotations-${index}-type`}
        value={keyValue}
        required
        error={keyError}
        aria-describedby={clsx('annotations-description', {
          [`annotations-${index}-type-error`]: keyError,
        })}
        onChange={keyOnChange}
      />

      <Label htmlFor={`annotations-${index}-value`}>Value</Label>
      {valueError && (
        <ErrorMessage id={`annotations-${index}-value-error`}>
          {valueError}
        </ErrorMessage>
      )}

      {annotation?.values ? (
        <Select
          id={`annotations-${index}-value`}
          className="style-mb-m"
          value={values.value}
          required
          invalid={!!valueError}
          aria-describedby={clsx('annotations-description', {
            [`annotations-${index}-value-error`]: valueError,
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
          id={`annotations-${index}-value`}
          placeholder={annotation?.example ? annotation.example : undefined}
          value={values.value ?? ''}
          required
          invalid={!!valueError}
          className="style-mb-m"
          aria-describedby={clsx('annotations-description', {
            [`annotations-${index}-value-error`]: valueError,
          })}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(values.key, e.target.value || '');
          }}
        />
      )}

      <div className="style-mb-m">
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
