import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StorageService from '../../../utils/storage';
import Home from './Home';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../../services/request', () => ({
  login: jest.fn(),
}));

jest.mock('../../../utils/storage', () => ({
  saveData: jest.fn(),
  removeData: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('Home', () => {
  beforeEach(() => {
    useNavigate.mockReturnValue(jest.fn());
  });

  it('renders the login form', () => {
    render(<Home />);
    expect(screen.getByLabelText('Usuário')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const loginMock = jest.fn();
    loginMock.mockResolvedValue({ status: 201, data: { token: 'token', accessLevel: 'Admin' } });

    render(<Home />);
    fireEvent.change(screen.getByLabelText('Usuário'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() =>
      expect(loginMock).toHaveBeenCalledWith('/auth', { email: 'test@example.com', password: 'password123' })
    );
    expect(StorageService.saveData).toHaveBeenCalledWith('token', 'token');
    expect(StorageService.saveData).toHaveBeenCalledWith('accessLevel', 'Admin');
    expect(useNavigate()).toHaveBeenCalledWith('/dashboard');
  });

  it('shows an error toast on login failure', async () => {
    const loginMock = jest.fn();
    loginMock.mockRejectedValue(new Error('Network error'));

    render(<Home />);
    fireEvent.change(screen.getByLabelText('Usuário'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Credenciais inválidas. Por favor, verifique seu email e senha.')
    );
  });
});
