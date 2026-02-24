import {
  Button,
  ErrorMessage,
  Field,
  Heading,
  Label,
  Select,
  TextInput,
} from '@amsterdam/design-system-react';
import { TrashBinIcon } from '@amsterdam/design-system-react-icons';
import { FieldErrors } from '../../schema';
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
  errors?: FieldErrors;
}

const LinkRepeaterRow = ({
  index,
  item,
  removeItem,
  onChange,
  errors,
}: LinkRepeaterRowProps) => {
  const getFieldError = (fieldName: string) => {
    const fieldKey = `links.${index}.${fieldName}` as keyof FieldErrors;
    return errors?.[fieldKey];
  };

  const urlError = getFieldError('url');
  const titleError = getFieldError('title');

  return (
    <div className={styles.root} key={index}>
      <Heading level={4}>Link {index + 1}</Heading>

      <Field className="ams-mb-m">
        <Label htmlFor={`links-${index}-url`}>URL</Label>
        {urlError && (
          <ErrorMessage id={`links-${index}-url-error`}>
            {urlError}
          </ErrorMessage>
        )}
        <TextInput
          type="url"
          name="url"
          id={`links-${index}-url`}
          value={item.url}
          required
          aria-describedby={`links-description ${urlError ? `links-${index}-url-error` : ''}`}
          onChange={e => onChange('url', e.target.value)}
        />
      </Field>
      <Field className="ams-mb-m">
        <Label htmlFor={`links-${index}-title`}>Title</Label>
        {titleError && (
          <ErrorMessage id={`links-${index}-title-error`}>
            {titleError}
          </ErrorMessage>
        )}
        <TextInput
          name="title"
          value={item.title}
          id={`links-${index}-title`}
          required
          aria-describedby={`links-description ${titleError ? `links-${index}-title-error` : ''}`}
          onChange={e => onChange('title', e.target.value)}
        />
      </Field>
      <Field className="ams-mb-m">
        <Label htmlFor={`links-${index}-icon`}>Icon</Label>
        <Select
          name="icon"
          value={item?.icon}
          id={`links-${index}-icon`}
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
};

export default LinkRepeaterRow;
