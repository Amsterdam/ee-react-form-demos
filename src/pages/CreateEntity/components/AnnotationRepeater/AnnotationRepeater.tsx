import { useRef } from 'react';
import { Button, Heading, Paragraph } from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
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
      label: string | undefined;
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
  const itemIdsRef = useRef<Map<number, string>>(new Map());

  const items: AnnotationItem[] = initialValues.map(({ key, value }, index) => {
    // Get or create a stable ID for this index
    if (!itemIdsRef.current.has(index)) {
      itemIdsRef.current.set(index, `annotation-${++idCounterRef.current}`);
    }

    return {
      id: itemIdsRef.current.get(index)!,
      label: key,
      value,
    };
  });

  // Add a new repeater row
  const addItem = () => {
    const newItem: AnnotationItem = {
      id: `annotation-${++idCounterRef.current}`,
      label: '',
      value: '',
    };

    // Merge back into the original annotation values
    const newItems = [...items, newItem];
    const newAnnotations = newItems.map(item => ({
      label: item.label,
      value: item.value,
    }));

    onChange(newAnnotations);
  };

  // Remove a repeater row and the corresponding data
  const removeItem = (index: number) => {
    // Clean up the ID ref
    itemIdsRef.current.delete(index);
    // Refresh the array to prevent updating incorrect key indexes
    const entries = Array.from(itemIdsRef.current.entries());
    itemIdsRef.current.clear();
    entries.forEach(([idx, id]) => {
      if (idx > index) {
        itemIdsRef.current.set(idx - 1, id);
      } else if (idx < index) {
        itemIdsRef.current.set(idx, id);
      }
    });

    const newItems = items.filter((_, i) => i !== index);
    const newAnnotations = newItems.map(item => ({
      label: item.label,
      value: item.value,
    }));

    onChange(newAnnotations);
  };

  const updateItem = (
    index: number,
    label: string | undefined,
    value: string | undefined
  ) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, label, value } : item
    );

    const newAnnotations = newItems.map(item => ({
      label: item.label,
      value: item.value,
    }));

    onChange(newAnnotations);
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

export default AnnotationRepeater;
