import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SignUpPage } from '../sign-up-page';
import { Wrapper } from '../../utils/test-setup/wrapper';
import { delay, http, HttpResponse } from 'msw';
import { server, SIGN_UP_URL } from '../../utils/test-setup/msw/server';

describe('입력한 이메일과 비밀번호를 제출을 하면 회원가입이 완료된다.', () => {
  it('회원가입 api가 요청되면, 로더가 노출된다.', async () => {
    // Given
    const email = 'asdf@asf.com';
    const password = 'asdf123!@#';
    server.use(
      http.post(SIGN_UP_URL, async () => {
        await delay();
        return HttpResponse.json({ key: 'test' }, { status: 200 });
      })
    );

    // When
    const { getByTestId } = render(<SignUpPage />, {
      wrapper: ({ children }) => {
        return <Wrapper initialEntry="/sign-up">{children}</Wrapper>;
      },
    });
    const emailComponent = getByTestId('email');
    const passwordComponent = getByTestId('password');
    const buttonComponent = getByTestId('submit-button');
    fireEvent.change(emailComponent, { target: { value: email } });
    fireEvent.change(passwordComponent, { target: { value: password } });
    fireEvent.click(buttonComponent);

    // Then
    await waitFor(() => {
      const loaderComponent = screen.getByTestId('loader');
      expect(loaderComponent).toBeInTheDocument();
    });
  });
  it('회원가입 api의 status가 200이 내려오면, 회원가입 완료페이지가 노출된다.', () => {});
  it('회원가입 api의 status가 400이나 500이 내려오면, 실패페이지가 노출된다.', () => {});
});
