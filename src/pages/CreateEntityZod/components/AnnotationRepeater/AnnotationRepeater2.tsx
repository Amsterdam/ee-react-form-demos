import {
  Button,
  ErrorMessage,
  Heading,
  Paragraph,
} from '@amsterdam/design-system-react';
import { PlusIcon } from '@amsterdam/design-system-react-icons';
import AnnotationRepeaterRow from '../AnnotationRepeaterRow/AnnotationRepeaterRow';
import { AnnotationItem } from '@/types/types';
import { FieldErrors } from '../../schema';
import styles from './AnnotationRepeater.module.css';
import { useCallback } from 'react';

interface AnnotationRepeaterProps {
  items: (AnnotationItem & { id: string })[];
  errors: FieldErrors;
  onChange: (annotations: (AnnotationItem & { id: string })[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValidateField?: (fieldPath: string, value: any) => void;
}

// An AnnotationRepeater field is a repeater field of two fields:
// 1. A select (react-select) field (the repeater field's 'key')
// 2. A corresponding input or select menu (the repeater field's
// 'value'). On change it returns an object 'annotations' of array of
// { key: '', value: '' }
const AnnotationRepeater = ({
  items,
  errors,
  onChange,
  onValidateField,
}: AnnotationRepeaterProps) => {
  // Add a new repeater row
  const addItem = () => {
    const newItems = [
      ...items,
      { id: crypto.randomUUID(), key: '', value: '' },
    ];
    onChange(newItems);

    // Validate the annotations array after adding a new item
    onValidateField?.('annotations', newItems);
  };

  // Remove a repeater row
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);

    // Validate the links array after removing an item
    onValidateField?.('annotations', newItems);
  };

  const updateItem = useCallback(
    (index: number, key: string, value: string) => {
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
      console.log({ items, newItems });

      // Validate the single field and the entire links array
      onValidateField?.(`annotations.${index}.${key}`, value);
      onValidateField?.('annotations', newItems);
    },
    [items]
  );

  const annotationsError = errors.annotations;

  return (
    <div className={`${styles.container} ams-mb-l`}>
      <Heading level={4} className="ams-mb-s">
        Annotations
      </Heading>

      <Paragraph size="small" className="ams-mb-s" id="annotations-description">
        An object with arbitrary non-identifying metadata attached to the
        entity, identical in use to Kubernetes object annotations.
      </Paragraph>

      {annotationsError && (
        <ErrorMessage id="annotations-error" className="style-mb-s">
          {annotationsError}
        </ErrorMessage>
      )}

      <div className="ams-mb-m">
        {items.map((item, index) => (
          <AnnotationRepeaterRow
            removeItem={() => removeItem(index)}
            index={index}
            values={{ label: item.key, value: item.value }}
            key={`ari-${item.id}`}
            keyError={errors[`annotations.${index}.key` as keyof FieldErrors]}
            valueError={
              errors[`annotations.${index}.value` as keyof FieldErrors]
            }
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
