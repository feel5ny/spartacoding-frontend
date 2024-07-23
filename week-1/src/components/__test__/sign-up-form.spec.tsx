import { SignUpForm } from '../sign-up-form';
import { render, screen } from '@testing-library/react';
import { MutableRefObject } from 'react';
import { ERROR_MSG } from '../../hooks/use-sign-up';

const mockRef: {
  email: MutableRefObject<string>;
  password: MutableRefObject<string>;
} = {
  email: { current: '' },
  password: { current: '' },
};
describe('SignUpForm 컴포넌트가 로드되면', () => {
  it('이메일 Form, password Form, 제출버튼이 노출된다.', async () => {
    render(
      <SignUpForm
        errorText={{ errorEmailText: '', errorPasswordText: '' }}
        onSubmit={() => null}
        initFormState={() => null}
        currentValue={mockRef}
      />
    );

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });
});

describe('SignUpForm 컴포넌트의 props에 errorText.errorEmailText가 있으면', () => {
  it('errorText.errorEmailText가 노출된다.', async () => {
    render(
      <SignUpForm
        errorText={{ errorEmailText: ERROR_MSG.email, errorPasswordText: '' }}
        onSubmit={() => null}
        initFormState={() => null}
        currentValue={mockRef}
      />
    );

    expect(screen.getByText(ERROR_MSG.email)).toBeInTheDocument();
  });
});

describe('SignUpForm 컴포넌트의 props에 errorText.errorPasswordText가 있으면', () => {
  it('errorText.errorPasswordText가 노출된다.', async () => {
    render(
      <SignUpForm
        errorText={{
          errorEmailText: '',
          errorPasswordText: ERROR_MSG.password,
        }}
        onSubmit={() => null}
        initFormState={() => null}
        currentValue={mockRef}
      />
    );
    expect(screen.getByText(ERROR_MSG.password)).toBeInTheDocument();
  });
});
