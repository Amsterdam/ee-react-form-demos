import {
  Button,
  Field,
  Heading,
  Label,
  Select,
  TextInput,
} from '@amsterdam/design-system-react';
import { TrashBinIcon } from '@amsterdam/design-system-react-icons';
import styles from './LinkRepeaterRow.module.css';

interface LinkRepeaterRowProps {
  index: number;
  item: {
    url: string;
    title: string;
    icon: string;
  };
  removeItem: () => void;
  onChange: (name: string, value: string) => void;
}

const LinkRepeaterRow = ({
  index,
  item,
  removeItem,
  onChange,
}: LinkRepeaterRowProps) => (
  <div className={styles.root} key={index}>
    <Heading level={4}>Link {index + 1}</Heading>

    <Field className="ams-mb-m">
      <Label htmlFor={`link-${index}-url`}>URL</Label>
      <TextInput
        type="url"
        name="url"
        id={`link-${index}-url`}
        value={item.url}
        required
        aria-describedby="links-description"
        onChange={e => onChange('url', e.target.value)}
      />
    </Field>
    <Field className="ams-mb-m">
      <Label htmlFor={`link-${index}-title`}>Title</Label>
      <TextInput
        name="title"
        value={item.title}
        id={`link-${index}-title`}
        required
        aria-describedby="links-description"
        onChange={e => onChange('title', e.target.value)}
      />
    </Field>
    <Field className="ams-mb-m">
      <Label htmlFor={`link-${index}-icon`}>Icon</Label>
      <Select
        name="icon"
        value={item?.icon}
        id={`link-${index}-icon`}
        required
        aria-describedby="links-description"
        onChange={e =>
          onChange('icon', e.target.options[e.target.selectedIndex].value)
        }
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
