import { Button, ButtonProps, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
export const SubmitButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[700],
  },
}));
