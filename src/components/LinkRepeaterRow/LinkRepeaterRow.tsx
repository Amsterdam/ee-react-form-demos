import {
  Button,
  Field,
  Heading,
  Label,
  Select,
  TextInput,
} from '@amsterdam/design-system-react';
import styles from './styles.module.css';
import { TrashBinIcon } from '@amsterdam/design-system-react-icons';

interface LinkRepeaterRowProps {
  index: number;
  item: {
    url: string;
    title: string;
    icon: string;
  };
  removeItem: () => void;
}

const LinkRepeaterRow = ({ index, item, removeItem }: LinkRepeaterRowProps) => (
  <div className={styles.root} key={index}>
    <Heading level={4}>Link {index + 1}</Heading>

    <Field className="ams-mb-m">
      <Label htmlFor="body">URL</Label>
      <TextInput
        type="url"
        name="url"
        value={item.url}
        // onChange={e => handleChange(index, e.target.value)}
      />
    </Field>
    <Field className="ams-mb-m">
      <Label htmlFor="body">Title</Label>
      <TextInput
        name="title"
        value={item.title}
        // onChange={e => handleChange(index, e.target.value)}
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
        onClick={() => removeItem()}
      >
        Delete
      </Button>
    </div>
  </div>
);

export default LinkRepeaterRow;
