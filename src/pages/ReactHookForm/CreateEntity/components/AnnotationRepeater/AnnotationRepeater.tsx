import { Button, Heading, Paragraph } from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
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

const AnnotationRepeater = ({
  control,
  errors,
  setValue,
}: AnnotationRepeaterProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'annotations',
  });

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
