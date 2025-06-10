import App from '@/containers/App/App';
import CreateEntity from '@/pages/CreateEntity/CreateEntity';
import EditEntity from '@/pages/EditEntity/EditEntity';
import ContactForm from './pages/ContactForm/ContactForm';
import ContactFormLive from './pages/ContactFormLive/ContactFormLive';

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
      {
        path: 'contact-2',
        element: <ContactFormLive />,
      },
      // {
      //   path: '*',
      //   element: <NotFound /> // Or whatever component you want for 404s
      // }
    ],
  },
];

export default routes;
