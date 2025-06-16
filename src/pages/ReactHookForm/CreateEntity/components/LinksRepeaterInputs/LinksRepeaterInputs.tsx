import { Control, FieldErrors } from 'react-hook-form';
import { Button, Heading, Paragraph } from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
import LinkRepeaterRow from '../LinkRepeaterRow/LinkRepeaterRow';
import { EntityFormData as RHFEntityFormData } from '../../schema';
import styles from './LinksRepeaterInputs.module.css';

interface LinksRepeaterInputsProps {
  fields: {
    id: string;
    url: string;
    title: string;
    icon?: string;
  }[];
  append: (item: { url: string; title: string; icon?: string }) => void;
  remove: (index: number) => void;
  control: Control<RHFEntityFormData>;
  errors: FieldErrors<RHFEntityFormData>['links'];
}

const LinksRepeaterInputs = ({
  fields,
  append,
  remove,
  control,
  errors,
}: LinksRepeaterInputsProps) => (
  <div className={`${styles.container} ams-mb-l`}>
    <Heading level={4} className="ams-mb-s">
      Links
    </Heading>
    <Paragraph size="small" className="ams-mb-s" id="links-description">
      A list of external hyperlinks related to the entity...
    </Paragraph>

    <div className="ams-mb-m">
      {fields.map((field, index) => (
        <LinkRepeaterRow
          key={field.id}
          index={index}
          control={control}
          remove={remove}
          errors={errors?.[index]}
        />
      ))}
    </div>

    <Button
      icon={<EnlargeIcon />}
      iconBefore
      variant="tertiary"
      onClick={() => append({ url: '', title: '', icon: 'dashboard' })}
    >
      Add a new link
    </Button>
  </div>
);

export default LinksRepeaterInputs;
