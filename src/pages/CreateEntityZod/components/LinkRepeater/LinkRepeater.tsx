import { Button, Heading, Paragraph } from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
import LinkRepeaterRow from '../LinkRepeaterRow/LinkRepeaterRow';
import { FieldErrors } from '../../schema';
import styles from './LinkRepeater.module.css';

interface LinkRepeaterProps {
  items: {
    url: string;
    title: string;
    icon: string;
  }[];
  onChange: (
    items: {
      url: string;
      title: string;
      icon: string;
    }[]
  ) => void;
  errors?: FieldErrors;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValidateField?: (fieldPath: string, value: any) => void;
}

const LinkRepeater = ({
  items,
  onChange,
  errors,
  onValidateField,
}: LinkRepeaterProps) => {
  console.log({ items, errors });
  const addItem = () => {
    const newItems = [...items, { url: '', title: '', icon: 'dashboard' }];
    onChange(newItems);
    // Validate the entire links array after adding
    onValidateField?.('links', newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
    // Validate the entire links array after removing
    onValidateField?.('links', newItems);
  };

  const updateItem = (index: number, name: string, value: string) => {
    const newItems = items.map((item, i) =>
      i === index
        ? {
            ...item,
            [name]: value,
          }
        : item
    );
    onChange(newItems);

    // Validate the specific field and the entire links array
    onValidateField?.(`links.${index}.${name}`, value);
    onValidateField?.('links', newItems);
  };

  const handleBlur = (index: number, name: string, value: string) => {
    onValidateField?.(`links.${index}.${name}`, value);
  };

  return (
    <div className={`${styles.container} ams-mb-l`}>
      <Heading level={4} className="ams-mb-s">
        Links
      </Heading>

      <Paragraph size="small" className="ams-mb-s" id="links-description">
        A list of external hyperlinks related to the entity. Links can provide
        additional contextual information that may be located outside of
        Backstage itself. For example, an admin dashboard or external CMS page.
      </Paragraph>

      {errors?.links && typeof errors.links === 'string' && (
        <div className="error-message style-mb-s">{errors.links}</div>
      )}

      <div className="ams-mb-m">
        {items.map((item, index) => (
          <LinkRepeaterRow
            removeItem={() => removeItem(index)}
            index={index}
            item={item}
            onChange={(name, value) => updateItem(index, name, value)}
            onBlur={(name, value) => handleBlur(index, name, value)}
            errors={errors}
            key={`lri-${index}`}
          />
        ))}
      </div>

      <Button
        icon={<EnlargeIcon />}
        iconBefore
        variant="tertiary"
        onClick={addItem}
      >
        Add a new link
      </Button>
    </div>
  );
};

export default LinkRepeater;
