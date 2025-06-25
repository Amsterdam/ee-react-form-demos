import { Button, Heading, Paragraph } from '@amsterdam/design-system-react';
import { PlusIcon } from '@amsterdam/design-system-react-icons';
import AnnotationRepeaterRow from '../AnnotationRepeaterRow/AnnotationRepeaterRow';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormSetValue,
} from 'react-hook-form';
import { EntityFormData } from '../../schema';
import styles from './AnnotationRepeater.module.css';

interface AnnotationRepeaterProps {
  control: Control<EntityFormData>;
  errors: FieldErrors<EntityFormData>;
  setValue: UseFormSetValue<EntityFormData>;
}

// An AnnotationRepeater field is a repeater field of two fields:
// 1. A select (react-select) field (the repeater field's 'key')
// 2. A corresponding input or select menu (the repeater field's
// 'value').
const AnnotationRepeater = ({
  control,
  errors,
  setValue,
}: AnnotationRepeaterProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'annotations',
  });

  // Add a new repeater row
  const addItem = () => {
    append({
      key: '',
      value: '',
    });
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
        {fields.map((field, index) => (
          <AnnotationRepeaterRow
            key={field.id}
            control={control}
            index={index}
            removeItem={() => remove(index)}
            errors={errors}
            setValue={setValue}
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
