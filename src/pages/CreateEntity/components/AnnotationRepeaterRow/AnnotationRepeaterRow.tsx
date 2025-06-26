import { ChangeEvent, useCallback, useMemo } from 'react';
import ANNOTATIONS from '@/utils/getAnnotations';
import InputAutoSelect from '../../../../components/InputAutoSelect/InputAutoSelect';
import {
  Button,
  Field,
  Heading,
  Label,
  Select,
  TextInput,
} from '@amsterdam/design-system-react';
import { TrashBinIcon } from '@amsterdam/design-system-react-icons';
import { AnnotationItem } from '@/types/types';
import styles from './AnnotationRepeaterRow.module.css';

interface AnnotationRepeaterRowProps {
  index: number;
  removeItem?: () => void;
  onChange: (key: string, value: string) => void;
  values: AnnotationItem;
}

const AnnotationRepeaterRow = ({
  index,
  removeItem = undefined,
  onChange,
  values,
}: AnnotationRepeaterRowProps) => {
  const annotation = ANNOTATIONS.find(
    annotation => annotation.key === values.key
  );
  const keyOptions = useMemo(
    () => ANNOTATIONS.map(({ key, label }) => ({ value: key, label })),
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
    <Field className={styles.container}>
      <Heading level={4}>Annotation {index + 1}</Heading>
      <Label htmlFor={`annotation-type-${index}`}>Type</Label>
      <InputAutoSelect
        options={keyOptions}
        id={`annotation-type-${index}`}
        value={keyValue}
        required
        aria-describedby="annotations-description"
        onChange={keyOnChange}
      />

      <Label htmlFor={`annotation-value-${index}`}>Value</Label>

      {annotation?.values ? (
        <Select
          id={`annotation-value-${index}`}
          className="ams-mb-m"
          value={values.value}
          required
          aria-describedby="annotations-description"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            onChange(values.key ?? '', e.target.value || '');
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
          className="ams-mb-m"
          aria-describedby="annotations-description"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(values.key ?? '', e.target.value || '');
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
