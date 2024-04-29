import React from 'react';
import '../../styles/main.css';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../../presentation/components/header/header';
import StorageService from '../../../utils/storage';
import { Form, Label, Title } from './Home.styles';
import { login } from '../../../services/request';
import SubmitButton from '../../../presentation/components/button/button';

const Home = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email('Digite um email válido').required('Email é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos').required('Senha é obrigatória'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, event): Promise<void> => {
    event.preventDefault();
    try {
      const response = await login('/auth', { email: data.email, password: data.password });
      if (response.status === 201) {
        StorageService.removeData('token');
        StorageService.removeData('accessLevel');

        StorageService.saveData('token', response.data.token);
        StorageService.saveData('accessLevel', response.data.accessLevel);
        navigate('/dashboard');
      }
      if (response.status === 400) {
        toast.error('Credenciais inválidas. Por favor, verifique seu email e senha.');
      }
    } catch (error) {
      toast.error('Credenciais inválidas. Por favor, verifique seu email e senha.');
    }
  };

  return (
    <div className="App">
      <Header />
      <Box display="flex" width="100%" justifyContent="center">
        <Box width="50%" display="flex" justifyContent="center" alignItems="center">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <>
              <Title fontSize={32}>
                Olá, seja bem-vindo(a)
                <br /> Faça seu login para continuar
              </Title>
              <Box width="400px" marginTop="20px">
                <TextField
                  fullWidth
                  id="email"
                  label="Usuário"
                  variant="outlined"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={(errors.email?.message as string) ?? ''}
                />

                <Label>Insira o email do seu usuário</Label>
                <TextField
                  fullWidth
                  type="password"
                  id="username"
                  label="Senha"
                  variant="outlined"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={(errors.password?.message as string) ?? ''}
                />
                <Label>Insira sua senha</Label>
                <SubmitButton text="Entrar" />
              </Box>
            </>
          </Form>
          <ToastContainer />
        </Box>
      </Box>
      <Box />
    </div>
  );
};

export default Home;
