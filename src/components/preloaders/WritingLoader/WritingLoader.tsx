import { Column, Paragraph } from '@amsterdam/design-system-react';
import styles from './WritingLoader.module.css';

const WritingLoader = () => (
  <div>
    <Column alignHorizontal="center">
      <div className={styles.loader} />
      <Paragraph>Even geduld…</Paragraph>
    </Column>
  </div>
);

export default WritingLoader;
