import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/core/model/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  [x: string]: any;

  constructor(
    private httpClient: HttpClient
  ) { }
  
  public getAllProduto(params: HttpParams): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/pessoa`, { params });
  }

  public getIdProduto(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/pessoa/${id}`);
  };

  public postProduto(payload: ProductModel): Observable<ProductModel> {
    return this.httpClient.post<ProductModel>(`${environment.apiUrl}/pessoa`, payload);
  };

  public updateProduto(id: number,data: ProductModel ): Observable<ProductModel> {
    return this.httpClient.put<ProductModel>(`${environment.apiUrl}/pessoa/${id}`, data);
  };

  public deleteProduto(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/pessoa/${id}`);
  };
}


