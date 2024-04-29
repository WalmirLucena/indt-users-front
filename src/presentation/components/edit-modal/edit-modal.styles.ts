import { styled, TextField } from '@mui/material';

export const InputBase = styled(TextField)(() => ({
  width: '100%',
  '& label.Mui-focused': {
    color: '#00CE7C',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#00CE7C',
    },
  },
}));

export const Form = styled('form')``;
