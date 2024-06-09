import { MutableRefObject } from 'react';
import { SignUpForm } from '../sign-up-form';
import { mount } from 'cypress/react18';

const mockRef: {
  email: MutableRefObject<string>;
  password: MutableRefObject<string>;
} = {
  email: { current: '' },
  password: { current: '' },
};

describe('<SignUpForm />', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <SignUpForm
        errorText={{ errorEmailText: '', errorPasswordText: '' }}
        onSubmit={() => null}
        initFormState={() => null}
        currentValue={mockRef}
      />
    );
  });
});
