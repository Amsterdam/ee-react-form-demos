import { useState } from 'react';
import { Button, Heading } from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
import AnnotationRow from '../AnnotationRow/AnnotationRow';
import styles from './styles.module.css';

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

  // const handleChange = (index: number, value: string) => {
  //   const newItems = [...items];
  //   newItems[index] = value;
  //   setItems(newItems);
  //   // onChange(newItems);
  // };

  const addItem = () => {
    const newItems = [...items, ''];
    setItems(newItems);
    // onChange(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    // onChange(newItems);
  };

  return (
    <div className={`${styles.container} ams-mb-m`}>
      <Heading level={4} className="ams-mb-s">
        Annotations
      </Heading>

      <div className="ams-mb-m">
        {items.map((item, index) => (
          <AnnotationRow
            // showRemoveButton={items.length > 1}
            removeItem={() => removeItem(index)}
            index={index}
            key={index}
          />
        ))}
      </div>

      <Button
        icon={<EnlargeIcon />}
        iconBefore
        variant="tertiary"
        onClick={addItem}
      >
        Add a new annotation
      </Button>
    </div>
  );
};

export default FormAnnotationFields;
