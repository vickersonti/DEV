import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersModel } from 'src/app/core/model/users.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  public postSignup(payload: UsersModel): Observable<UsersModel> {
    return this.httpClient.post<UsersModel>(`${environment.apiUrl}/users`, payload);
  };

  public getUser(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/users`);
  }

}
