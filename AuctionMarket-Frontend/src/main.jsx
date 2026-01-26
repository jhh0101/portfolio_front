import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast from 'react-hot-toast';

import App from './App.jsx'

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            toast.error(error.response?.data?.message || "데이터를 불러오는 데 실패했습니다.");
        },
    }),

    defaultOptions: {
        mutations: {
            onError: (error) => {
                toast.error(error.response?.data?.message || "요청 처리에 실패했습니다.");
            }
        },
        queries: {
            throwOnError: false,
            retry: 1,
        }
    }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  </StrictMode>,
)
