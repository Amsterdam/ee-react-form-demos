import ANNOTATIONS from '@/utils/getAnnotations';
import InputAutoSelect from '../InputAutoSelect/InputAutoSelect';
import { IconButton, Label, TextInput } from '@amsterdam/design-system-react';
import styles from './styles.module.css';
import { useState } from 'react';

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

  return (
    <div className={styles.row}>
      <h4>Annotation {index + 1}</h4>
      <Label htmlFor="select">Type</Label>
      <InputAutoSelect
        options={ANNOTATIONS.map(({ key, label }) => ({ key, label }))}
      />

      <Label htmlFor="body">Value</Label>

      <TextInput
        // aria-describedby={`${description ? 'description2' : ''} ${error ? 'error2' : ''}`}
        id="input3"
        // value={value}
        // invalid={!!error}
        // placeholder={}
        name="annotation_value"
      />
      {/* {showRemoveButton && ( */}
        <IconButton label="Sluiten" onClick={() => removeItem?.()} />
      {/* )} */}
    </div>
  );
};

export default AnnotationRow;
