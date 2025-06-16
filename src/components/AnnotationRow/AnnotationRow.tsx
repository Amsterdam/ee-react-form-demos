import { ChangeEvent } from 'react';
import ANNOTATIONS from '@/utils/getAnnotations';
import InputAutoSelect from '../InputAutoSelect/InputAutoSelect';
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

interface AnnotationRowProps {
  index: number;
  removeItem?: () => void;
  onChange: (key: string | undefined, value: string | undefined) => void;
  values: { label: string | undefined; value: string | undefined };
}

const AnnotationRow = ({
  index,
  removeItem = undefined,
  onChange,
  values,
}: AnnotationRowProps) => {
  const annotation = ANNOTATIONS.find(
    annotation => annotation.key === values.label
  );

  return (
    <Field className={styles.container}>
      <Heading level={4}>Annotation {index + 1}</Heading>
      <Label htmlFor={`annotation-type-${index}`}>Type</Label>
      <InputAutoSelect
        options={ANNOTATIONS.map(({ key, label }) => ({ value: key, label }))}
        id={`annotation-type-${index}`}
        value={ANNOTATIONS.map(({ key, label }) => ({
          value: key,
          label,
        })).find(option => option.value === values.label)}
        required
        aria-describedby="annotations-description"
        onChange={(newValue: unknown | null) => {
          if (newValue) {
            const selectedKey = (newValue as { value: string }).value;
            const rule = ANNOTATIONS.find(a => a.key === selectedKey);
            const defaultValue = rule?.values ? rule.values[0] : undefined;

            onChange(selectedKey, defaultValue);
          } else {
            onChange(undefined, undefined);
          }
        }}
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
            onChange(values.label, e.target.value || undefined);
          }}
        >
          {annotation.values.map((value, valueIndex) => (
            <Select.Option value={value} key={`${values.label}-${valueIndex}`}>
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
            onChange(values.label, e.target.value || undefined);
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

export default AnnotationRow;
