import { Grid } from '@amsterdam/design-system-react';
import HomeIcon from '@/assets/icons/housing.svg?react';
import styles from './styles.module.css';

const Home = () => (
  <Grid>
    <Grid.Cell span="all">
      <p>
        Home <HomeIcon className={styles.icon} />
      </p>
    </Grid.Cell>
  </Grid>
);

export default Home;
