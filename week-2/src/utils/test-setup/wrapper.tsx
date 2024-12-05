import { MutableSnapshot, RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import { PropsWithChildren } from 'react';

export const Wrapper = ({
  children,
  initialEntry = '',
  initializeState,
}: PropsWithChildren<{
  initialEntry?: string;
  initializeState?: (mutableSnapshot: MutableSnapshot) => void;
}>) => (
  <RecoilRoot initializeState={initializeState}>
    <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
  </RecoilRoot>
);
