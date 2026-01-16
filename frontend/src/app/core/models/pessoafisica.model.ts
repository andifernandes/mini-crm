// src/app/core/models/pessoafisica.model.ts
import { Endereco } from '../../core/models/endereco.model';

export interface PessoaFisica {
  id?: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  enderecoId: string;
  endereco?: Endereco;
}
