import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import StylesTopLevelProvider from '../containers/StylesTopLevelProvider/StylesTopLevelProvider';
import { RefreshContextProvider } from '../context/RefreshContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StylesTopLevelProvider>
          <RefreshContextProvider>
            <Component {...pageProps} />
          </RefreshContextProvider>
        </StylesTopLevelProvider>
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
