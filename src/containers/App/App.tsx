import { Outlet } from 'react-router';
import { Page } from '@amsterdam/design-system-react';
import Header from '@/components/Header/Header';
import styles from './styles.module.css';

const App = () => (
  <Page>
    <Header />
    <div className={styles.container}>
      <Outlet />
    </div>
  </Page>
);

export default App;
