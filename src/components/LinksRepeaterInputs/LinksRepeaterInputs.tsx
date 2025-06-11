import { useEffect, useState } from 'react';
import { Button, Heading, Paragraph } from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
import styles from './styles.module.css';
import LinkRepeaterRow from '../LinkRepeaterRow/LinkRepeaterRow';

interface LinksRepeaterInputsProps {
  initialValues: {
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

const LinksRepeaterInputs = ({
  initialValues,
  onChange,
}: LinksRepeaterInputsProps) => {
  const [items, setItems] = useState<
    {
      url: string;
      title: string;
      icon: string;
    }[]
  >(initialValues);

  const addItem = () => {
    setItems([...items, { url: '', title: '', icon: 'dashboard' }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  useEffect(() => {
    onChange(items);
  }, [items]);

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
            onChange={(name, value) => {
              setItems(prevItems =>
                prevItems.map((prevItem, i) =>
                  i === index
                    ? {
                        ...prevItem,
                        [name]: value,
                      }
                    : prevItem
                )
              );
            }}
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
