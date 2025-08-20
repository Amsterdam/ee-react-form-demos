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
import { Control, Controller, FieldError } from 'react-hook-form';
import { EntityFormData as RHFEntityFormData } from '../../schema';
import styles from './LinkRepeaterRow.module.css';
import clsx from 'clsx';

interface LinkRepeaterRowProps {
  control: Control<RHFEntityFormData>;
  index: number;
  removeItem: (index: number) => void;
  errors:
    | {
        url?: FieldError;
        title?: FieldError;
        icon?: FieldError;
      }
    | undefined;
}

const LinkRepeaterRow = ({
  control,
  index,
  removeItem,
  errors,
}: LinkRepeaterRowProps) => {
  return (
    <div className={styles.root}>
      <Heading level={4}>Link {index + 1}</Heading>

      <Field className="ams-mb-m" invalid={!!errors?.url?.message}>
        <Label htmlFor={`links.${index}.url`}>URL</Label>
        {errors?.url?.message && (
          <ErrorMessage id={`link-url-${index}-error`}>
            {errors?.url?.message}
          </ErrorMessage>
        )}
        <Controller
          name={`links.${index}.url`}
          control={control}
          render={({ field }) => (
            <TextInput
              type="url"
              id={`links.${index}.url`}
              {...field}
              required
              invalid={!!errors?.url?.message}
              aria-describedby={clsx('links-description', {
                [`link-url-${index}-error`]: errors?.url?.message,
              })}
            />
          )}
        />
      </Field>

      <Field className="ams-mb-m" invalid={!!errors?.title?.message}>
        <Label htmlFor={`links.${index}.title`}>Title</Label>
        {errors?.title?.message && (
          <ErrorMessage id={`link-title-${index}-error`}>
            {errors?.title?.message}
          </ErrorMessage>
        )}
        <Controller
          name={`links.${index}.title`}
          control={control}
          render={({ field }) => (
            <TextInput
              id={`links.${index}.title`}
              {...field}
              required
              invalid={!!errors?.title?.message}
              aria-describedby={clsx('links-description', {
                [`link-title-${index}-error`]: errors?.title?.message,
              })}
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
          onClick={() => removeItem(index)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default LinkRepeaterRow;
