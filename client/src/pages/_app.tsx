import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import StylesTopLevelProvider from '../containers/StylesTopLevelProvider/StylesTopLevelProvider';
import { RefreshContextProvider } from '../context/RefreshContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <StylesTopLevelProvider>
        <RefreshContextProvider>
          <Component {...pageProps} />
        </RefreshContextProvider>
      </StylesTopLevelProvider>
    </Provider>
  );
}

export default MyApp;
