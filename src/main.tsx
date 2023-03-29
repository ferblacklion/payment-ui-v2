import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SWRConfig } from 'swr';
import App from './App';
import { fetcher } from './constants';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SWRConfig
        value={{
          fetcher: fetcher,
        }}
      >
        <App />
      </SWRConfig>
    </ChakraProvider>
  </React.StrictMode>,
);
