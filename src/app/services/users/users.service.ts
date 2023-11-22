import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable, BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }


  signin(login: any): Observable<any> {
    return this.http.post<any>(`http://localhost:4000/api/login`, login)
      .pipe(
        tap(loginResponse => {
          this.tokenService.saveToken(loginResponse.token);
        })
      )
  }

  signUp(signup: any): Observable<any> {
    return this.http.post<any>(`http://localhost:4000/api/signup`, signup)
  }
}
