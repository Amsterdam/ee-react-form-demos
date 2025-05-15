import App from '@/containers/App/App';
import Home from '@/pages/Home/Home';
import Contact from '@/pages/Contact/Contact';

const routes = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      // {
      //   path: '*',
      //   element: <NotFound /> // Or whatever component you want for 404s
      // }
    ],
  },
];

export default routes;
