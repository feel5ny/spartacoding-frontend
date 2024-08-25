import {
  Alert,
  Backdrop,
  Card,
  CircularProgress,
  Snackbar,
  Typography,
} from '@mui/material';
import { useSignUp } from '../hooks/use-sign-up';
import { SignUpForm } from './sign-up-form';
import { grey } from '@mui/material/colors';
import { SignUpComplete } from './sign-up-complete';

export const SignUpCard = () => {
  const { isPending, isSuccess, onReset, ...rest } = useSignUp();
  return (
    <>
      <Card sx={{ padding: 3, width: 300 }}>
        <Typography variant="h5" mb={2} sx={{ fontWeight: 'bold' }}>
          회원가입
        </Typography>
        {isSuccess ? (
          <SignUpComplete onReset={onReset} />
        ) : (
          <SignUpForm {...rest} />
        )}
      </Card>

      {/* footer */}
      <Typography variant="caption" mb={2} sx={{ color: grey[600] }}>
        SpartaCoding Frontend - week1
      </Typography>

      {/* feedback */}
      <Snackbar
        open={isSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success">회원가입에 성공하였습니다.</Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isPending}
        data-testid="loader"
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
