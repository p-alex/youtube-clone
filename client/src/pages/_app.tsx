import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { RefreshContextProvider } from '../context/RefreshContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RefreshContextProvider>
        <Component {...pageProps} />
      </RefreshContextProvider>
    </Provider>
  );
}

export default MyApp;
