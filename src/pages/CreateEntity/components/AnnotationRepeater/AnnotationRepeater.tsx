import { useRef, useState } from 'react';
import { Button, Heading, Paragraph } from '@amsterdam/design-system-react';
import { PlusIcon } from '@amsterdam/design-system-react-icons';
import AnnotationRepeaterRow from '../AnnotationRepeaterRow/AnnotationRepeaterRow';
import styles from './AnnotationRepeater.module.css';

type AnnotationItem = {
  id: string;
  label: string | undefined;
  value: string | undefined;
};

interface AnnotationRepeaterProps {
  initialValues: { key: string; value: string | undefined }[];
  onChange: (
    annotations: {
      key: string;
      value: string | undefined;
    }[]
  ) => void;
}

// An AnnotationRepeater field is a repeater field of two fields:
// 1. A select (react-select) field (the repeater field's 'key')
// 2. A corresponding input or select menu (the repeater field's
// 'value'). On change it returns an object 'annotations' of array of
// { key: '', value: '' }
const AnnotationRepeater = ({
  initialValues,
  onChange,
}: AnnotationRepeaterProps) => {
  // Keep a reference of IDs to prevent updating previously deleted indexes
  const idCounterRef = useRef(0);
  const [items, setItems] = useState<AnnotationItem[]>(() =>
    initialValues.map(({ key, value }) => ({
      id: `annotation-${++idCounterRef.current}`,
      label: key,
      value,
    }))
  );

  // Helper function to convert items to annotations format
  const itemsToAnnotations = (itemsArray: AnnotationItem[]) => {
    return itemsArray.map(item => ({
      key: item.label || '',
      value: item.value,
    }));
  };

  // Add a new repeater row
  const addItem = () => {
    const newItem: AnnotationItem = {
      id: `annotation-${++idCounterRef.current}`,
      label: '',
      value: '',
    };

    const newItems = [...items, newItem];
    setItems(newItems);
    onChange(itemsToAnnotations(newItems));
  };

  // Remove a repeater row
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(itemsToAnnotations(newItems));
  };

  const updateItem = (
    index: number,
    label: string | undefined,
    value: string | undefined
  ) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, label, value } : item
    );
    setItems(newItems);
    onChange(itemsToAnnotations(newItems));
  };

  return (
    <div className={`${styles.container} ams-mb-l`}>
      <Heading level={4} className="ams-mb-s">
        Annotations
      </Heading>

      <Paragraph size="small" className="ams-mb-s" id="annotations-description">
        An object with arbitrary non-identifying metadata attached to the
        entity, identical in use to Kubernetes object annotations.
      </Paragraph>

      <div className="ams-mb-m">
        {items.map((item, index) => (
          <AnnotationRepeaterRow
            removeItem={() => removeItem(index)}
            index={index}
            values={{ label: item.label, value: item.value }}
            key={item.id}
            onChange={(label, value) => updateItem(index, label, value)}
          />
        ))}
      </div>

      <Button
        icon={<PlusIcon />}
        iconBefore
        variant="tertiary"
        onClick={addItem}
      >
        Add a new annotation
      </Button>
    </div>
  );
};

export default AnnotationRepeater;
