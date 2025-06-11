import { useEffect, useRef, useState } from 'react';
import { Button, Heading, Paragraph } from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
import AnnotationRow from '../AnnotationRow/AnnotationRow';
import styles from './styles.module.css';

type AnnotationItem = {
  id: string;
  label: string | undefined;
  value: string | undefined;
};

interface FormAnnotationFieldsProps {
  initialValues: { key: string; value: string | undefined }[];
  onChange: (
    annotations: {
      label: string | undefined;
      value: string | undefined;
    }[]
  ) => void;
}

const FormAnnotationFields = ({
  initialValues,
  onChange,
}: FormAnnotationFieldsProps) => {
  const idCounterRef = useRef(0);

  const [items, setItems] = useState<AnnotationItem[]>(
    initialValues.map(({ key, value }) => ({
      id: `annotation-${++idCounterRef.current}`,
      label: key,
      value,
    }))
  );

  const addItem = () => {
    const newItem: AnnotationItem = {
      id: `annotation-${++idCounterRef.current}`,
      label: '',
      value: '',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const updateItem = (
    index: number,
    label: string | undefined,
    value: string | undefined
  ) => {
    setItems(prevItems =>
      prevItems.map((prevItem, i) =>
        i === index ? { ...prevItem, label, value } : prevItem
      )
    );
  };

  useEffect(() => {
    onChange(items);
  }, [items]);

  return (
    <div className={`${styles.container} ams-mb-l`}>
      <Heading level={4} className="ams-mb-s">
        Annotations
      </Heading>

      <Paragraph size="small" className="ams-mb-s">
        An object with arbitrary non-identifying metadata attached to the
        entity, identical in use to Kubernetes object annotations.
      </Paragraph>

      <div className="ams-mb-m">
        {items.map((item, index) => (
          <AnnotationRow
            removeItem={() => removeItem(index)}
            index={index}
            values={{ label: item.label, value: item.value }}
            key={item.id}
            onChange={(label, value) => updateItem(index, label, value)}
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
