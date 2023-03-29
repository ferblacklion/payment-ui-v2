// src/__tests__/App.test.tsx
import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { SWRConfig } from 'swr';
import App from './App';
import { fetcher } from './constants';

const AllProviders = ({ children }: React.PropsWithChildren) => (
  <ChakraProvider>
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      {children}
    </SWRConfig>
  </ChakraProvider>
);
describe('App', () => {
  it('should work as expected', () => {
    const { container } = render(
      <AllProviders>
        <App />
      </AllProviders>,
    );
    expect(container).toBeInTheDocument();
  });
});
