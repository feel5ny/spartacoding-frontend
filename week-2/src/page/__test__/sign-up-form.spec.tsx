import { act, fireEvent, render } from '@testing-library/react';
import { SignUpPage } from '../sign-up-page';
import { ERROR_EMAIL_MSG } from '../../hooks/use-validate-credential';

/**
 * !입력 테스트
 * * 이메일, 비밀번호를 입력하지 않으면 회원가입 할 수 없다.
 * * 이메일은 이메일 형식이 아니면, 회원가입 할 수 없다.
 */
describe('이메일, 비밀번호를 입력하지 않으면 회원가입 할 수 없다.', () => {
  it('이메일, 비밀번호를 모두 한글자 이상 입력하면, 버튼은 활성화된다.', () => {
    // Given
    const email = 'a';
    const password = 'b';

    // When
    const { getByTestId } = render(<SignUpPage />);
    const emailComponent = getByTestId('email');
    const passwordComponent = getByTestId('password');
    fireEvent.change(emailComponent, { target: { value: email } });
    fireEvent.change(passwordComponent, { target: { value: password } });

    // Then
    const buttonComponent = getByTestId('submit-button');
    expect(buttonComponent).not.toBeDisabled();
  });
});

describe('이메일은 이메일 형식이 아니면, 회원가입 할 수 없다.', () => {
  it('형식에 맞지 않은 이메일을 입력하고 제출버튼을 누르면, "이메일 형식이 아닙니다." 문구가 노출된다.', () => {
    // Given
    const invalidEmail = 'asdf';

    // When
    const { getByTestId } = render(<SignUpPage />);
    const emailComponent = getByTestId('email');
    fireEvent.change(emailComponent, { target: { value: invalidEmail } });

    const passwordComponent = getByTestId('password');
    fireEvent.change(passwordComponent, { target: { value: 'asdf' } });

    act(() => {
      const buttonComponent = getByTestId('submit-button');
      fireEvent.click(buttonComponent);
    });

    // Then
    const helperComponent = getByTestId('email-helper-text');
    expect(helperComponent).toHaveTextContent(ERROR_EMAIL_MSG);
  });
});
