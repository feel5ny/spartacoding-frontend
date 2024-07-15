/**
 * !진입 테스트
 * * 로그인을 하지 않은 유저는 회원가입 페이지에 진입할 수 있다.
 * * 로그인한 유저는 회원가입 페이지에 진입할 수 없다.
 */

import { render } from '@testing-library/react';
import App from '../../App';

describe('유저는 회원가입 페이지에 진입할 수 있다', () => {
  it('로그인을 하지 않은 유저는, 회원가입 페이지에 진입할 수 있다.', () => {
    // Given
    const isLogin = false;
    const path = '/sign-up';

    // When
    render(<App />);

    // Then
    expect(window.location.pathname).toHaveTextContent(path);
  });

  it('로그인한 유저는, 회원가입 페이지에 진입할 수 없다.', () => {});
});
