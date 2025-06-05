import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Heading } from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
import AnnotationRow from '../AnnotationRow/AnnotationRow';
import styles from './styles.module.css';

interface FormAnnotationFieldsProps {
  initialValues: { key: string; value: string | undefined }[];
  // label: string;
  onChange: (
    annotations: {
      label: string | undefined;
      value: string | undefined;
    }[]
  ) => void;
}

const FormAnnotationFields = ({
  initialValues,
  // label,
  onChange,
}: FormAnnotationFieldsProps) => {
  const [items, setItems] = useState<
    { label: string | undefined; value: string | undefined }[]
  >(
    initialValues.map(({ key, value }) => ({
      label: key,
      value,
    }))
  );

  const addItem = () => {
    setItems([...items, { label: '', value: '' }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  useEffect(() => {
    onChange(items);
  }, [items]);

  return (
    <div className={`${styles.container} ams-mb-l`}>
      <Heading level={4} className="ams-mb-s">
        Annotations
      </Heading>

      <div className="ams-mb-m">
        {items.map((item, index) => (
          <AnnotationRow
            removeItem={() => removeItem(index)}
            index={index}
            values={item}
            key={`faf-${uuidv4()}`}
            onChange={(label, value) => {
              setItems(prevItems =>
                prevItems.map((prevItem, i) =>
                  i === index ? { label, value } : prevItem
                )
              );
            }}
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
