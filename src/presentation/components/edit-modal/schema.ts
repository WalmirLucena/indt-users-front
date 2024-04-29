import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Digite um email válido').required('Email é obrigatório'),
  deleted: yup.string().required('Selecione um status'),
  accessLevel: yup.string().required('Selecione um nível de acesso'),
});

export default schema;
