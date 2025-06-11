import {
  Button,
  Field,
  Heading,
  Label,
  Select,
  TextInput,
} from '@amsterdam/design-system-react';
import { TrashBinIcon } from '@amsterdam/design-system-react-icons';
import { Control, Controller } from 'react-hook-form';
import { EntityFormData } from '@/types';
import styles from './LinkRepeaterRow.module.css';

interface LinkRepeaterRowProps {
  index: number;
  control: Control<EntityFormData>;
  remove: (index: number) => void;
}

const LinkRepeaterRow = ({ index, control, remove }: LinkRepeaterRowProps) => (
  <div className={styles.root}>
    <Heading level={4}>Link {index + 1}</Heading>

    <Field className="ams-mb-m">
      <Label htmlFor={`links.${index}.url`}>URL</Label>
      <Controller
        name={`links.${index}.url`}
        control={control}
        render={({ field }) => (
          <TextInput
            type="url"
            id={`links.${index}.url`}
            {...field}
            required
            aria-describedby="links-description"
          />
        )}
      />
    </Field>

    <Field className="ams-mb-m">
      <Label htmlFor={`links.${index}.title`}>Title</Label>
      <Controller
        name={`links.${index}.title`}
        control={control}
        render={({ field }) => (
          <TextInput
            id={`links.${index}.title`}
            {...field}
            required
            aria-describedby="links-description"
          />
        )}
      />
    </Field>

    <Field className="ams-mb-m">
      <Label htmlFor={`links.${index}.icon`}>Icon</Label>
      <Controller
        name={`links.${index}.icon`}
        control={control}
        render={({ field }) => (
          <Select id={`links.${index}.icon`} {...field}>
            <Select.Option value="dashboard">Dashboard</Select.Option>
            <Select.Option value="github">GitHub</Select.Option>
            <Select.Option value="launch">Launch</Select.Option>
          </Select>
        )}
      />
    </Field>

    <div className="ams-mb-m">
      <Button
        icon={TrashBinIcon}
        iconBefore
        variant="tertiary"
        onClick={() => remove(index)}
      >
        Delete
      </Button>
    </div>
  </div>
);

export default LinkRepeaterRow;
