import { Card, Typography } from '@mui/material';
import { SignUpForm } from './sign-up-form';
import { grey } from '@mui/material/colors';

export const SignUpCard = () => {
  return (
    <>
      <Card sx={{ padding: 3, width: 300 }}>
        <Typography variant="h5" mb={2} sx={{ fontWeight: 'bold' }}>
          회원가입
        </Typography>
        <SignUpForm />
      </Card>

      {/* footer */}
      <Typography variant="caption" mb={2} sx={{ color: grey[600] }}>
        SpartaCoding Frontend - week1
      </Typography>
    </>
  );
};
