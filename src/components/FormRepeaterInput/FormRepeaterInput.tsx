import { useState } from 'react';
import {
  Button,
  Field,
  IconButton,
  Label,
  TextInput,
} from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
import styles from './styles.module.css';

interface FormRepeaterInputProps {
  initialValues: string[];
  label: string;
  onChange: (items: string[]) => void;
}

const FormRepeaterInput = ({
  initialValues,
  label,
  onChange,
}: FormRepeaterInputProps) => {
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
    <Field className="ams-mb-xs">
      <Label htmlFor="input4">{label}</Label>
      {items.map((item, index) => (
        <div className={styles.row} key={index}>
          <TextInput
            value={item}
            onChange={e => handleChange(index, e.target.value)}
          />
          {items.length > 1 && (
            <IconButton label="Sluiten" onClick={() => removeItem(index)} />
          )}
        </div>
      ))}
      <Button icon={<EnlargeIcon />} onClick={addItem}>
        Add item
      </Button>
    </Field>
  );
};

export default FormRepeaterInput;
