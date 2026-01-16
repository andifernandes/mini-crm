// src/app/features/enderecos/services/enderecos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../../models/endereco.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnderecosService {
  private baseUrl = `${environment.apiUrl}/enderecos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.baseUrl);
  }

  create(endereco: Omit<Endereco, 'id'>): Observable<Endereco> {
    return this.http.post<Endereco>(this.baseUrl, endereco);
  }

  update(endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.baseUrl}/${endereco.id}`, endereco);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getByCep(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.baseUrl}/consulta/${cep}`);
  }
}
