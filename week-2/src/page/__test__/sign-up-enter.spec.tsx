/**
 * !진입 테스트
 * * 로그인을 하지 않은 유저는 회원가입 페이지에 진입할 수 있다.
 * * 로그인한 유저는 회원가입 페이지에 진입할 수 없다.
 */

import { render, screen } from '@testing-library/react';
import App from '../../App';
import { LocationDisplay } from '../../utils/test-setup/location-display';
import { Wrapper } from '../../utils/test-setup/wrapper';

describe('유저는 회원가입 페이지에 진입할 수 있다', () => {
  it('로그인을 하지 않은 유저는, 회원가입 페이지에 진입할 수 있다.', () => {
    // Given
    const isLogin = false;
    const path = '/sign-up';

    // When
    render(<App />, {
      wrapper: ({ children }) => {
        return (
          <Wrapper initialEntry={path}>
            {children}
            <LocationDisplay />
          </Wrapper>
        );
      },
    });

    // Then
    expect(screen.getByTestId('location-display')).toHaveTextContent(path);
  });

  it('로그인한 유저는, 회원가입 페이지에 진입할 수 없다.', () => {});
});
