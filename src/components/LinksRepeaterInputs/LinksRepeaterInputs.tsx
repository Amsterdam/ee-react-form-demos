import { Button, Heading, Paragraph } from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
import styles from './styles.module.css';
import LinkRepeaterRow from '../LinkRepeaterRow/LinkRepeaterRow';

interface LinksRepeaterInputsProps {
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
}

const LinksRepeaterInputs = ({ items, onChange }: LinksRepeaterInputsProps) => {
  const addItem = () => {
    onChange([...items, { url: '', title: '', icon: 'dashboard' }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
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

      <div className="ams-mb-m">
        {items.map((item, index) => (
          <LinkRepeaterRow
            removeItem={() => removeItem(index)}
            index={index}
            item={item}
            onChange={(name, value) => updateItem(index, name, value)}
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

export default LinksRepeaterInputs;
