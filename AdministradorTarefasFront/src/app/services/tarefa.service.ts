import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private readonly apiUrl = `${environment.apiUrl}/Tarefa`;

  constructor(private http: HttpClient) { }

  getTodasPorStatus(status: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/status/${status}`);
  }

  getPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  criar(tarefa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tarefa);
  }

  atualizar(tarefa: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, tarefa);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}