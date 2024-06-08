import {
  Button,
  ButtonProps,
  Card,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import './App.css';
import { grey } from '@mui/material/colors';

function App() {
  return (
    <>
      <Card sx={{ padding: 3, width: 300 }}>
        <Typography variant="h5" mb={2} sx={{ fontWeight: 'bold' }}>
          회원가입
        </Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          label="이메일"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="비밀번호"
          variant="outlined"
        />

        <SubmitButton
          variant="contained"
          size="large"
          fullWidth
          sx={{ marginTop: 1 }}
        >
          제출
        </SubmitButton>
      </Card>
      <Typography variant="caption" mb={2} sx={{ color: grey[600] }}>
        SpartaCoding Frontend - week1
      </Typography>
    </>
  );
}

export default App;

const SubmitButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[700],
  },
}));
