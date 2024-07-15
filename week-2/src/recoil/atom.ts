import { atom } from 'recoil';

export const authState = atom<{ isLogin: boolean }>({
  key: 'auth',
  default: {
    isLogin: false,
  },
});
