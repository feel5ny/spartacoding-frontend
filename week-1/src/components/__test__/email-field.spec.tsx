/**
 * email-field
 * @userStory
 * * 유저는 이메일을 입력할 수 있다.
 *
 * * 1) 유저가 데이터를 입력했을 때, 이메일 형식에 맞지 않으면, 에러텍스트가 노출된다.
 * * 2) 유저가 데이터를 입력했을 때, 이메일 형식에 맞으면, 에러텍스트는 노출되지 않는다.
 *
 * !순서
 * * 1) 최소한의 테스트케이스 작성 -> 실패
 * * 2) 실제 컴포넌트 구현 -> 성공
 * * 3) 리팩토링 -> 실패
 * * 4) 테스트케이스 수정 -> 성공
 *
 * !email form
 * * 이메일 데이터를 관리해야한다.
 * * 이메일 validation을 관리해야한다.
 */
import { fireEvent, render } from '@testing-library/react';
import {
  EMAIL_ERROR_TEXT,
  useValidateCredential,
} from '../../hooks/use-validate-credential';
import { EmailField } from '../email-field';
import { describe, it, Mock, vi } from 'vitest';

// 의존성 mocking
/**
 * * 의존성 mocking
 * ? 특정 코드의 동작을 테스트할 때, 그 코드가 의존하는 외부 컴포넌트를 실제로 호출하지 않고 "가짜로 흉내 내는 것"
 * TODO: 1. mocking을 하고 / 2. Given환경에 맞는 mock데이터를 반환하게 만든다.
 */

vi.mock('../../hooks/use-validate-credential', async (importOriginal) => {
  const mod = await importOriginal<
    typeof import('../../hooks/use-validate-credential')
  >();
  return { ...mod, useValidateCredential: vi.fn() };
});

const _useValidateCredential = useValidateCredential as Mock;

describe('EmailField', () => {
  // 성공
  it('유저가 데이터를 입력했을 때 이메일 형식에 맞으면, 에러텍스트는 노출되지 않는다.', () => {
    // Given
    const email = 'absd@asdf.com';
    _useValidateCredential.mockReturnValue({
      emailErrorText: '',
      validateCredential: () => null,
    });

    // When
    const { getByTestId, queryByText } = render(<EmailField />);
    // input form
    const emailInput = getByTestId('email');
    // form 이메일 작성된 것 처럼
    fireEvent.change(emailInput, { target: { value: email } });

    // Then
    expect(queryByText(EMAIL_ERROR_TEXT)).not.toBeInTheDocument();
  });

  // 예외
  it('유저가 데이터를 입력했을 때 이메일 형식에 맞지 않으면, 에러텍스트가 노출된다.', () => {});
});
