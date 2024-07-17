import { MutableSnapshot, RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import App from '../../App';

export const Wrapper = ({
  children,
  initialEntry = '',
  initializeState,
}: PropsWithChildren<{
  initialEntry?: string;
  initializeState?: (mutableSnapshot: MutableSnapshot) => void;
}>) => (
  <QueryClientProvider client={new QueryClient()}>
    <RecoilRoot initializeState={initializeState}>
      <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
    </RecoilRoot>
  </QueryClientProvider>
);

export const renderSignUp = () => {
  return render(<App />, {
    wrapper: ({ children }) => (
      <Wrapper initialEntry="/sign-up">{children}</Wrapper>
    ),
  });
};
