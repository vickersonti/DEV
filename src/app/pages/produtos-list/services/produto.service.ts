import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/core/model/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllProduto(params: HttpParams): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/produtos`, { params });
  }

  public getIdProduto(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/produtos/${id}`);
  };

  public postProduto(payload: ProductModel): Observable<ProductModel> {
    return this.httpClient.post<ProductModel>(`${environment.apiUrl}/produtos`, payload);
  };

  public updateProduto(id: number,data: ProductModel ): Observable<ProductModel> {
    return this.httpClient.put<ProductModel>(`${environment.apiUrl}/produtos/${id}`, data);
  };

  public deleteProduto(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/produtos/${id}`);
  };
}
