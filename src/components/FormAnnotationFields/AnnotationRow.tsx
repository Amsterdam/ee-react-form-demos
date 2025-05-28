import { useState } from 'react';
import ANNOTATIONS from '@/utils/getAnnotations';
import InputAutoSelect from '../InputAutoSelect/InputAutoSelect';
import { Button, Label, TextInput } from '@amsterdam/design-system-react';
import styles from './styles.module.css';
import getAnnotations from '@/utils/getAnnotations';
import { CloseIcon } from '@amsterdam/design-system-react-icons';

interface AnnotationRowProps {
  index: number;
  removeItem?: () => void;
  // showRemoveButton?: boolean;
}

const AnnotationRow = ({
  index,
  removeItem = undefined,
  // showRemoveButton = false,
}: AnnotationRowProps) => {
  const [keyValue, setKeyValue] = useState<string | undefined>(undefined);
  const rules =
    ANNOTATIONS.find(annotation => annotation.key === keyValue)?.type ??
    'string';

  return (
    <div className={styles.row}>
      <h4>Annotation {index + 1}</h4>
      <Label htmlFor="select">Type</Label>
      <InputAutoSelect
        options={ANNOTATIONS.map(({ key, label }) => ({ key, label }))}
        onChange={(newValue: unknown | null) => {
          if (newValue) {
            setKeyValue((newValue as { label: string; key: string }).key);
          } else {
            setKeyValue(undefined);
          }
        }}
      />

      <Label htmlFor="body">Value</Label>

      <TextInput
        // aria-describedby={`${description ? 'description2' : ''} ${error ? 'error2' : ''}`}
        id="input3"
        // value={value}
        // invalid={!!error}
        // placeholder={}
        name="annotation_value"
        className="ams-mb-m"
      />
      {/* {showRemoveButton && ( */}
      <div>
        <Button icon={CloseIcon} onClick={() => removeItem?.()}>
          Sluiten
        </Button>
      </div>
      {/* )} */}
    </div>
  );
};

export default AnnotationRow;
