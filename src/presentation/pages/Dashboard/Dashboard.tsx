import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, IconButton, List, Stack } from '@mui/material';
import { User } from 'services/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from '../../../presentation/components/edit-modal/edit-modal';
import { getUsers, setToken } from '../../../services/request';
import Header from '../../../presentation/components/header/header';
import StorageService from '../../../utils/storage';
import RemoveModal from '../../../presentation/components/removeModal/remove-modal';
import { Barplot } from '../../../presentation/components/Barplot/Barplot';

const Dashboard = () => {
  const token = StorageService.getData('token');
  const accessLevel = StorageService.getData('accessLevel');
  const navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);
  const [idSelected, setIdSelected] = useState<string>();
  const [removeModal, setRemoveModal] = useState(false);

  const [users, setUsers] = useState<User[]>();
  const [usersRaw, setUsersRaw] = useState<User[]>();

  const fetchUsers = async () => {
    const response = await getUsers('/users');
    if (response.status === 401) {
      navigate('/');
    }
    setUsersRaw(response.data);
    const activeUsersList = response.data.filter((user) => user.deleted === undefined || user.deleted === null);
    setUsers(activeUsersList);
  };

  useEffect(() => {
    if (!token) navigate('/');
    setToken(token.toString());
    fetchUsers();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Nome', width: 100 },
    { field: 'lastName', headerName: 'Sobrenome', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'accessLevel',
      headerName: 'Nível de Acesso',
      width: 120,
    },
    {
      field: 'deleted',
      headerName: 'Status',
      width: 90,
      valueGetter: (value, row) => `${row.deleted ? 'Inativo' : 'Ativo'}`,
    },
    {
      field: 'action',
      headerName: 'Ações',
      renderCell: (row) => (
        <Stack direction="row" spacing={2}>
          <IconButton
            color="info"
            size="small"
            onClick={() => {
              setEditModal(true);
              setIdSelected(row.id.toString());
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            color="error"
            size="small"
            onClick={() => {
              setRemoveModal(true);
              setIdSelected(row.id.toString());
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ height: '100%' }}>
      <Header />
      <Box
        display="flex"
        width="100%"
        justifyContent="center"
        alignItems="center"
        marginTop="80px"
        flexDirection="column"
      >
        {accessLevel.toString() === 'Admin' && (
          <Box display="flex" width="100%" justifyContent="center" alignItems="center" padding="24px">
            <List sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={{ height: 400, maxWidth: '800px' }}>
                {users && (
                  <DataGrid
                    rows={users}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                  />
                )}
              </div>
            </List>
          </Box>
        )}
        <Divider color="grey" flexItem />
        <Box display="flex" width="100%" justifyContent="center" alignItems="center">
          Gráfico de Usuários Ativos e Inativos
          {usersRaw && <Barplot width={500} height={500} data={usersRaw} />}
        </Box>
      </Box>
      <EditModal
        isOpen={editModal}
        id={idSelected}
        onClose={() => setEditModal(false)}
        title="Atualizar Dados do Usuário"
      />
      <RemoveModal
        isOpen={removeModal}
        id={idSelected}
        onClose={() => setRemoveModal(false)}
        title="Remover Dados do Usuário"
        text="Você realmente gostaria de Excluir esse Usuário?"
      />
    </div>
  );
};

export default Dashboard;
