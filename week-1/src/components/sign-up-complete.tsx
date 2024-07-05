import { Typography } from '@mui/material';
import { SubmitButton } from './submit-button';
import { SignUpReturnType } from '../hooks/use-sign-up';

export const SignUpComplete = ({
  onReset,
}: Pick<SignUpReturnType, 'onReset'>) => {
  return (
    <section>
      <Typography variant="h5">완료!👍</Typography>
      <SubmitButton
        variant="contained"
        size="large"
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={onReset}
      >
        돌아가기
      </SubmitButton>
    </section>
  );
};
