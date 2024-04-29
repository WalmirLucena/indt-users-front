import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CloseOutlined } from '@mui/icons-material';
import { Box, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import colors from '../../styles/colors';
import { Form, InputBase } from './edit-modal.styles';
import schema from './schema';
import SubmitButton from '../button/button';
import { updateUser } from '../../../services/request';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  title: string;
  id: string;
  isOpen: boolean;
  onClose: VoidFunction;
}

const EditModal: React.FC<Props> = (props) => {
  const {
    getValues,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    const formValues = getValues();
    console.log('formvalues', formValues);
    const data = {
      deleted: formValues.deleted === 'active' ? null : new Date(),
      accessLevel: formValues.accessLevel,
      email: formValues.email as string,
    };
    try {
      const user = await updateUser(`/users/${props.id}`, data);
      if (user.status === 200) {
        toast.success('Usuário alterado com sucesso!');
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Box>Email</Box>
              <Box>
                <Grid container spacing={12}>
                  <Grid item xs={12} marginTop={2}>
                    <InputBase
                      fullWidth
                      label="Email"
                      type="text"
                      placeholder="Email"
                      {...register('email')}
                      error={!!errors.email}
                      helperText={(errors.email?.message as string) ?? ''}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Grid container>
                  <Grid item xs={6}>
                    <Box paddingTop="16px">Nível de Acesso</Box>
                    <Controller
                      name="accessLevel"
                      control={control}
                      defaultValue="Common"
                      render={({ field }) => (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          inputProps={{ 'aria-label': 'Nível de acesso' }}
                          {...field}
                          error={!!errors.accessLevel}
                          helperText={errors.accessLevel?.message ?? ''}
                        >
                          <MenuItem value="Common">Comum</MenuItem>
                          <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                      )}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Box paddingTop="16px">Status Usuário</Box>
                    <Controller
                      name="deleted"
                      control={control}
                      defaultValue="active"
                      render={({ field }) => (
                        <RadioGroup row name="row-radio-buttons-group" {...field}>
                          <FormControlLabel value="active" control={<Radio />} label="Ativo" />
                          <FormControlLabel value="inactive" control={<Radio />} label="Inativo" />
                        </RadioGroup>
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box display="flex" justifyContent="center" alignItems="center" marginTop={1} marginBottom={2}>
                <Box width="300px">
                  <SubmitButton text="Atualizar" />
                </Box>
              </Box>
            </Box>
          </Form>
        </DialogContentText>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default EditModal;
