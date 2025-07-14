import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.root} data-testid="loader">
    <div className={styles.loader} />
  </div>
);

export default Loader;
