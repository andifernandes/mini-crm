import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// Model (mesma interface usada no component)
export interface PessoaFisica {
  id?: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  enderecoId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PessoaFisicaService {
  private baseUrl = `${environment.apiUrl}/PessoaFisica`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PessoaFisica[]> {
    return this.http.get<PessoaFisica[]>(this.baseUrl);
  }

  getById(id: string): Observable<PessoaFisica> {
    return this.http.get<PessoaFisica>(`${this.baseUrl}/${id}`);
  }

  create(pessoa: Omit<PessoaFisica, 'id'>): Observable<PessoaFisica> {
    return this.http.post<PessoaFisica>(this.baseUrl, pessoa);
  }

  update(pessoa: PessoaFisica): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${pessoa.id}`, pessoa);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
