import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PessoasModel } from 'src/app/core/model/pessoas.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllPessoas(params: HttpParams): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/pessoas`, { params });
  }

  public getIdPessoa(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/pessoas/${id}`);
  };

  public postPessoa(payload: PessoasModel): Observable<PessoasModel> {
    return this.httpClient.post<PessoasModel>(`${environment.apiUrl}/pessoas`, payload);
  };

  public updatePessoa(id: number,data: PessoasModel ): Observable<PessoasModel> {
    return this.httpClient.put<PessoasModel>(`${environment.apiUrl}/pessoas/${id}`, data);
  };

  public deletePessoa(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/pessoas/${id}`);
  };
}
