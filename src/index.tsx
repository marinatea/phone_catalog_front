import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ProductsProvider } from './context/ProductsContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ProductsProvider>
    <App />
  </ProductsProvider>,
);
