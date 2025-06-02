import { ChangeEvent, useEffect, useState } from 'react';
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
  values: { key: string | undefined; value: string | undefined };
}

const AnnotationRow = ({
  index,
  removeItem = undefined,
  onChange,
  values,
}: AnnotationRowProps) => {
  const [keyValue, setKeyValue] = useState<string | undefined>(values.key);
  // TODO fix name
  const [valueValue, setValueValue] = useState<string | undefined>(
    values.value
  );
  const annotation = ANNOTATIONS.find(
    annotation => annotation.key === keyValue
  );

  useEffect(() => {
    onChange(keyValue, valueValue);
  }, [keyValue, valueValue]);

  return (
    <Field className={styles.container}>
      <Heading level={4}>Annotation {index + 1}</Heading>
      <Label htmlFor={`annotation-type-${index}`}>Type</Label>
      <InputAutoSelect
        options={ANNOTATIONS.map(({ key, label }) => ({ key, label }))}
        id={`annotation-type-${index}`}
        onChange={(newValue: unknown | null) => {
          if (newValue) {
            setKeyValue((newValue as { label: string; key: string }).key);

            const rule = ANNOTATIONS.find(
              annotation =>
                (newValue as { label: string; key: string }).key ===
                annotation.key
            );

            if (rule?.values) {
              setValueValue(rule.values[0]);
            } else {
              setValueValue(undefined);
            }
          } else {
            setKeyValue(undefined);
          }
        }}
        value={ANNOTATIONS.map(({ key, label }) => ({ key, label })).find(
          option => option.key === keyValue
        )}
      />

      <Label htmlFor={`annotation-value-${index}`}>Value</Label>

      {annotation?.values ? (
        <Select
          // aria-describedby={description ? 'description2' : ''}
          id={`annotation-value-${index}`}
          name="annotation"
          className="ams-mb-m"
          value={valueValue}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            if (e.target.value) {
              setValueValue(e.target.value);
            } else {
              setValueValue(undefined);
            }
          }}
        >
          {annotation.values.map((value, optionIndex) => (
            <Select.Option
              value={value}
              key={`annotation-${index}-select-${optionIndex}`}
            >
              {value}
            </Select.Option>
          ))}
        </Select>
      ) : (
        <TextInput
          // aria-describedby={`${description ? 'description2' : ''} ${error ? 'error2' : ''}`}
          type={annotation?.type === 'url' ? 'url' : 'text'}
          id={`annotation-value-${index}`}
          // value={value}
          // invalid={!!error}
          placeholder={annotation?.example ? annotation.example : undefined}
          name="annotation_value"
          value={valueValue}
          className="ams-mb-m"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValueValue(e.target.value);
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
