export type LoginParams = {
  email: string;
  password: string;
};

export type UpdateParams = {
  acessLevel?: 'Common' | 'Admin';
  email?: string;
  deleted?: Date;
};

export type LoginResponse = {
  data: {
    accessLevel: string;
    firstName: string;
    token: string;
  };
  status: number;
};

export type UpdateResponse = {
  status: number;
};

export type User = {
  id: number;
  email: string;
  accessLevel: string;
  lastName: string;
  firstName: string;
  deleted?: Date;
};

export type GetUsersResponse = {
  data: User[];
  status: number;
};

export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
