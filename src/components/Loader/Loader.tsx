import { PropsWithChildren, useEffect, useState } from 'react';
import AmsterdamCrossSpinner from '../preloaders/AmsterdamCrossSpinner/AmsterdamCrossSpinner';
import AmsterdamTicTacToeLoader from '../preloaders/AmsterdamTicTacToeLoader/AmsterdamTicTacToeLoader';
import WritingLoader from '../preloaders/WritingLoader/WritingLoader';
import styles from './Loader.module.css';

interface LoaderProps extends PropsWithChildren {
  label?: string;
}

const preloaders = [
  AmsterdamCrossSpinner,
  AmsterdamTicTacToeLoader,
  WritingLoader,
];

const Loader = ({ children, label = 'Bezig met verzenden' }: LoaderProps) => {
  const [Preloader] = useState(
    () => preloaders[Math.floor(Math.random() * preloaders.length)]
  );

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className={styles.root}
      role="status"
      aria-label={label}
      aria-live="polite"
      aria-busy="true"
    >
      {children ?? <Preloader />}
    </div>
  );
};

export default Loader;
