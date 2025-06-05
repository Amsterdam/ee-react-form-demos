import { ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
import styles from './styles.module.css';

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
        value={ANNOTATIONS.map(({ key, label }) => ({
          value: key,
          label,
        })).find(option => option.value === values.label)}
        required
      />

      <Label htmlFor={`annotation-value-${index}`}>Value</Label>

      {annotation?.values ? (
        <Select
          // aria-describedby={description ? 'description2' : ''}
          // id={`annotation-value-${index}`}
          // name="annotation"
          className="ams-mb-m"
          defaultValue={values.value}
          required
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            onChange(values.label, e.target.value || undefined);
          }}
        >
          {annotation.values.map(value => (
            <Select.Option value={value} key={`annotation-row-${uuidv4()}`}>
              {value}
            </Select.Option>
          ))}
        </Select>
      ) : (
        <TextInput
          // aria-describedby={`${description ? 'description2' : ''} ${error ? 'error2' : ''}`}
          type={annotation?.type === 'url' ? 'url' : 'text'}
          // id={`annotation-value-${index}`}
          // value={value}
          // invalid={!!error}
          placeholder={annotation?.example ? annotation.example : undefined}
          // name="annotation_value"
          defaultValue={values.value ?? ''}
          required
          className="ams-mb-m"
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
