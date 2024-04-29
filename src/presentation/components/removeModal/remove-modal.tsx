import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CloseOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import colors from '../../styles/colors';
import { Form, InputBase } from './remove-modal.styles';
import SubmitButton from '../button/button';
import { removeUser } from '../../../services/request';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  title: string;
  id: string;
  text: string;
  isOpen: boolean;
  onClose: VoidFunction;
}

const RemoveModal: React.FC<Props> = (props) => {
  const onSubmit = async () => {
    event.preventDefault();
    try {
      const user = await removeUser(`/users/${props.id}`);
      if (user.status === 200) {
        toast.success('Usuário excluído com sucesso!');
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao processar a requisição. Por favor, tente novamente.');
    }
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      PaperProps={{
        style: {
          borderRadius: 12,
          width: 500,
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        bgcolor={colors.secundary}
        color={colors.white}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Box>{props.title}</Box>
        </Box>
        <Box onClick={props.onClose} style={{ cursor: 'pointer', paddingLeft: '16px' }}>
          <CloseOutlined />
        </Box>
      </DialogTitle>
      <DialogContent style={{ marginTop: '24px' }}>
        <DialogContentText color={colors.black} id="alert-dialog-description">
          <Form onSubmit={() => onSubmit()}>
            <Box>
              <Box>{props.text}</Box>
              <Box display="flex" justifyContent="center" alignItems="center" marginTop={1} marginBottom={2}>
                <Box width="300px">
                  <SubmitButton text="Remover usuário" />
                </Box>
              </Box>
            </Box>
          </Form>
          <ToastContainer />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveModal;
