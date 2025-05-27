import { useState } from 'react';
import {
  Button,
  Field,
  IconButton,
  Label,
  Row,
  TextInput,
} from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
import InputAutoSelect from '../InputAutoSelect/InputAutoSelect';
import ANNOTATIONS from '@/utils/getAnnotations';
import styles from './styles.module.css';
import AnnotationRow from './AnnotationRow';

interface FormAnnotationFieldsProps {
  initialValues: string[];
  // label: string;
  onChange: (items: Record<string, string>[]) => void;
}

const FormAnnotationFields = ({
  initialValues,
  // label,
  // onChange,
}: FormAnnotationFieldsProps) => {
  const [items, setItems] = useState<string[]>(initialValues);

  const handleChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
    onChange(newItems);
  };

  const addItem = () => {
    const newItems = [...items, ''];
    setItems(newItems);
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(newItems);
  };

  return (
    <Field className="ams-mb-m">
      <h3>Annotations</h3>
      {/* <AnnotationRow /> */}
      {/* <Label htmlFor="input4">Annotation type</Label>
      <InputAutoSelect
        options={ANNOTATIONS.map(({ key, label }) => ({ key, label }))}
      />

      <Label htmlFor="body">Value</Label>
      <TextInput
        // aria-describedby={`${description ? 'description2' : ''} ${error ? 'error2' : ''}`}
        id="input3"
        // value={value}
        // invalid={!!error}
        name="annotation_value"
      /> */}

      {items.map((item, index) => (
        <AnnotationRow
          // showRemoveButton={items.length > 1}
          removeItem={() => removeItem(index)}
          index={index}
          key={index}
        />
      ))}

      {/* {items.map((item, index) => (
        <div className={styles.row} key={index}>
          <InputAutoSelect
            options={ANNOTATIONS.map(({ key, label }) => ({ key, label }))}
          />

          <Label htmlFor="body">Value</Label>

          <TextInput
            // aria-describedby={`${description ? 'description2' : ''} ${error ? 'error2' : ''}`}
            id="input3"
            // value={value}
            // invalid={!!error}
            // placeholder={}
            name="annotation_value"
          />
          {items.length > 1 && (
            <IconButton label="Sluiten" onClick={() => removeItem(index)} />
          )}
        </div>
      ))} */}
      <Button icon={<EnlargeIcon />} onClick={addItem}>
        Add annotation
      </Button>
    </Field>
  );
};

export default FormAnnotationFields;
