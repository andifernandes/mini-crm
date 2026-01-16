// src/app/core/models/pessoajuridica.model.ts
import { Endereco } from '../../core/models/endereco.model';

export interface PessoaJuridica {
  id: number;
  razaoSocial: string;
  cnpj: string;
  telefone?: string;
  email?: string;
  enderecoId?: number;
  endereco?: Endereco;
}
