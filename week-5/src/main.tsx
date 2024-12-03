import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
