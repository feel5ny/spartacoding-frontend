import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderSignUp } from '../../utils/test-setup/wrapper';
import { delay, http, HttpResponse } from 'msw';
import { server, SIGN_UP_URL } from '../../utils/test-setup/msw/server';

describe('입력한 이메일과 비밀번호를 제출을 하면 회원가입이 완료된다.', () => {
  const beforeSubmit = () => {
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
    const { getByTestId } = renderSignUp();

    const emailComponent = getByTestId('email');
    const passwordComponent = getByTestId('password');
    const buttonComponent = getByTestId('submit-button');
    fireEvent.change(emailComponent, { target: { value: email } });
    fireEvent.change(passwordComponent, { target: { value: password } });
    fireEvent.click(buttonComponent);
  };

  it('회원가입 api가 요청되면, 로더가 노출된다.', async () => {
    beforeSubmit();
    // Then
    await waitFor(() => {
      const loaderComponent = screen.getByTestId('loader');
      expect(loaderComponent).toBeInTheDocument();
    });
  });

  it('회원가입 api의 status가 200이 내려오면, 회원가입 완료페이지가 노출된다.', async () => {
    beforeSubmit();
    const redirectPath = '/sign-up/success';

    // Then
    await waitFor(() => {
      /**
       * 디버깅이 필요할 경우
       * screen.debug();
       */
      expect(screen.getByTestId('location-display')).toHaveTextContent(
        redirectPath
      );
      expect(screen.getByText('성공')).toBeInTheDocument();
    });
  });

  it('회원가입 api의 status가 400이나 500이 내려오면, 실패페이지가 노출된다.', async () => {
    beforeSubmit();
    /**
     * !순서를 고려해주세요.
     * beforeSubmit 내부에서도 server.use를 통해 오버라이딩이 되고 있기 때문에,
     * 추가적인 오버라이딩이 필요할 경우 beforeSubmit 다음 순서에 위치되어있어야합니다.
     */
    server.use(
      http.post(SIGN_UP_URL, async () => {
        await delay();
        return HttpResponse.json({ key: 'test' }, { status: 400 });
      })
    );

    const redirectPath = '/sign-up/fail';

    // Then
    await waitFor(() => {
      /**
       * 디버깅이 필요할 경우
       * screen.debug();
       */
      expect(screen.getByTestId('location-display')).toHaveTextContent(
        redirectPath
      );
      expect(screen.getByText('실패')).toBeInTheDocument();
    });
  });
});
