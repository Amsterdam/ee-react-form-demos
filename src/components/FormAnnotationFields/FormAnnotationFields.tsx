import { useEffect, useState } from 'react';
import { Button, Heading } from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
import AnnotationRow from '../AnnotationRow/AnnotationRow';
import styles from './styles.module.css';

interface FormAnnotationFieldsProps {
  initialValues: { key: string; value: string | undefined }[];
  // label: string;
  onChange: (
    annotations: {
      key: string | undefined;
      value: string | undefined;
    }[]
  ) => void;
}

const FormAnnotationFields = ({
  initialValues,
  // label,
  onChange,
}: FormAnnotationFieldsProps) => {
  const [items, setItems] = useState<string[]>([]);
  const [values, setValues] =
    useState<{ key: string | undefined; value: string | undefined }[]>(
      initialValues
    );
console.log({ initialValues })
  // const handleChange = (index: number, value: string) => {
  //   const newItems = [...items];
  //   newItems[index] = value;
  //   setItems(newItems);
  //   // onChange(newItems);
  // };

  const addItem = () => {
    const newItems = [...items, ''];
    setItems(newItems);
    setValues([...values, { key: '', value: '' }]);
    // onChange(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);
    // onChange(newItems);
  };

  useEffect(() => {
    onChange(values);
  }, [values]);

  // console.log('FormAnnotationFields', { items, values });

  return (
    <div className={`${styles.container} ams-mb-m`}>
      <Heading level={4} className="ams-mb-s">
        Annotations
      </Heading>

      <div className="ams-mb-m">
        {values.map((_value, index) => (
          <AnnotationRow
            // showRemoveButton={items.length > 1}
            removeItem={() => removeItem(index)}
            index={index}
            key={index}
            onChange={(key, value) => {
              setValues(prevValues =>
                prevValues.map((prevValue, i) =>
                  i === index ? { key, value } : prevValue
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
