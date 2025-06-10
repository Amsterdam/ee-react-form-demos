import App from '@/containers/App/App';
import CreateEntity from '@/pages/CreateEntity/CreateEntity';
import EditEntity from '@/pages/EditEntity/EditEntity';
import ContactForm from './pages/ContactForm/ContactForm';

const routes = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <CreateEntity />,
      },
      {
        path: 'edit',
        element: <EditEntity />,
      },
      {
        path: 'contact',
        element: <ContactForm />,
      },
      // {
      //   path: '*',
      //   element: <NotFound /> // Or whatever component you want for 404s
      // }
    ],
  },
];

export default routes;
