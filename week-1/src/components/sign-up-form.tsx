import { Button, ButtonProps, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const SignUpForm = () => {
  return (
    <>
      <SubmitButton
        data-testid="submit-button"
        variant="contained"
        size="large"
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => null}
      >
        제출
      </SubmitButton>
    </>
  );
};

const SubmitButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[700],
  },
}));
