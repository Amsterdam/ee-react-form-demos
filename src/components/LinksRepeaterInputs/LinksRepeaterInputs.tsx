import { useState } from 'react';
import { Button, Heading } from '@amsterdam/design-system-react';
import { EnlargeIcon } from '@amsterdam/design-system-react-icons';
import styles from './styles.module.css';
import LinkRepeaterRow from '../LinkRepeaterRow/LinkRepeaterRow';

interface LinksRepeaterInputsProps {
  initialValues: {
    url: string;
    title: string;
    icon: string;
  }[];
  onChange: (items: string[]) => void;
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

  // const handleChange = (index: number, value: string) => {
  //   const newItems = [...items];
  //   newItems[index] = value;
  //   setItems(newItems);
  //   onChange(newItems);
  // };

  const addItem = () => {
    // const newItems = [...items, ''];
    // setItems(newItems);
    setItems([...items, { url: '', title: '', icon: 'dashboard' }]);
    // onChange(newItems);
  };

  const removeItem = (index: number) => {
    // const newItems = items.filter((_, i) => i !== index);
    // setItems(newItems);
    // onChange(newItems);
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // useEffect(() => {
  //   onChange(items);
  // }, [items]);

  return (
    <div className={`${styles.container} ams-mb-m`}>
      <Heading level={4} className="ams-mb-s">
        Links
      </Heading>

      <div className="ams-mb-m">
        {items.map((item, index) => (
          <LinkRepeaterRow
            removeItem={() => removeItem(index)}
            index={index}
            item={item}
            key={index}
          />
        ))}
      </div>

      {/* {items.map((item, index) => (
        <div className={styles.row} key={index}>
          <Heading level={4}>Link {index + 1}</Heading>

          <Field className="ams-mb-m">
            <Label htmlFor="body">URL</Label>
            <TextInput
              type="url"
              name="url"
              value={item.url}
              onChange={e => handleChange(index, e.target.value)}
            />
          </Field>
          <Field className="ams-mb-m">
            <Label htmlFor="body">Title</Label>
            <TextInput
              name="title"
              value={item.title}
              onChange={e => handleChange(index, e.target.value)}
            />
          </Field>
          <Field className="ams-mb-m">
            <Label htmlFor="body">Icon</Label>
            <Select
              // aria-describedby={description ? 'description2' : ''}
              // id="input2"
              name="icon"
              value={item?.icon}
              // onChange={onChange}
            >
              <Select.Option value="dashboard">Dashboard</Select.Option>
              <Select.Option value="github">GitHub</Select.Option>
              <Select.Option value="launch">Launch</Select.Option>
            </Select>
          </Field>
          <div className="ams-mb-m">
            <Button
              icon={TrashBinIcon}
              iconBefore
              variant="tertiary"
              onClick={() => removeItem(index)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))} */}
      <Button icon={<EnlargeIcon />} onClick={addItem}>
        Add link
      </Button>
    </div>
  );
};

export default LinksRepeaterInputs;
