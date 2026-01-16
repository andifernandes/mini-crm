import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PessoaJuridica } from '../../models/pessoajuridica.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PessoaJuridicaService {
  private baseUrl = `${environment.apiUrl}/pessoajuridica`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PessoaJuridica[]> {
    return this.http.get<PessoaJuridica[]>(this.baseUrl);
  }

  create(pj: Omit<PessoaJuridica, 'id'>): Observable<PessoaJuridica> {
    return this.http.post<PessoaJuridica>(this.baseUrl, pj);
  }

  update(pj: PessoaJuridica): Observable<PessoaJuridica> {
    return this.http.put<PessoaJuridica>(`${this.baseUrl}/${pj.id}`, pj);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
