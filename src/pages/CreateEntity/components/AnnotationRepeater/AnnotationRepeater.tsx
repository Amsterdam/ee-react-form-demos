import { Button, Heading, Paragraph } from '@amsterdam/design-system-react';
import { PlusIcon } from '@amsterdam/design-system-react-icons';
import AnnotationRepeaterRow from '../AnnotationRepeaterRow/AnnotationRepeaterRow';
import { AnnotationItem } from '@/types/types';
import styles from './AnnotationRepeater.module.css';

interface AnnotationRepeaterProps {
  items: AnnotationItem[];
  onChange: (annotations: AnnotationItem[]) => void;
}

// An AnnotationRepeater field is a repeater field of two fields:
// 1. A select (react-select) field (the repeater field's 'key')
// 2. A corresponding input or select menu (the repeater field's
// 'value'). On change it returns an object 'annotations' of array of
// { key: '', value: '' }
const AnnotationRepeater = ({ items, onChange }: AnnotationRepeaterProps) => {
  // Add a new repeater row
  const addItem = () => {
    onChange([...items, { key: '', value: '' }]);
  };

  // Remove a repeater row
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const updateItem = (index: number, key: string, value: string) => {
    const newItems = items.map((item, i) =>
      i === index
        ? {
            ...item,
            key,
            value,
          }
        : item
    );
    onChange(newItems);
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
            values={item}
            key={`ari-${index}`}
            onChange={(key, value) => updateItem(index, key, value)}
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
