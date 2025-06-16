import App from '@/containers/App/App';
import CreateEntity from '@/pages/CreateEntity/CreateEntity';
import ContactForm from './pages/ContactForm/ContactForm';
import ContactFormLive from './pages/ContactFormLive/ContactFormLive';
import RHFCreateEntity from '@/pages/ReactHookForm/CreateEntity/CreateEntity';
import RHFContactForm from '@/pages/ReactHookForm/ContactForm/ContactForm';

const routes = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <CreateEntity />,
      },
      {
        path: 'contact',
        element: <ContactForm />,
      },
      {
        path: 'contact-2',
        element: <ContactFormLive />,
      },
      {
        path: '/rhf',
        element: <RHFCreateEntity />,
      },
      {
        path: '/rhf/contact',
        element: <RHFContactForm />,
      },
      // {
      //   path: '*',
      //   element: <NotFound /> // Or whatever component you want for 404s
      // }
    ],
  },
];

export default routes;
