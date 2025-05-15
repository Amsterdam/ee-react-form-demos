import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import '@amsterdam/design-system-tokens/dist/index.css';
import '@amsterdam/design-system-assets/font/index.css';
import '@amsterdam/design-system-css/dist/index.css';
import './style.css';
import routes from './routes';

function renderApp() {
  const root = createRoot(document.getElementById('root') as HTMLElement);
  const router = createBrowserRouter(routes);

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

renderApp();
