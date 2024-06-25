import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/common-interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(userDetails: User){    
    return this.http.post(`${environment.API_BASE_URL}/users`, userDetails)
    .pipe(
      switchMap((response: any) => {
        // Return a new observable with the response
        // console.log(response);
        return of(response);
      }),
      catchError((err) => {
        console.log('error caught in getEvents service')
        // console.error(err);
        return throwError(err);
      })
    );;
  }

  loginUser(){
    return this.http.get(`${environment.API_BASE_URL}/users`)
    .pipe(
      switchMap((response: any) => {
        // Return a new observable with the response
        // console.log(response);
        return of(response);
      }),
      catchError((err) => {
        console.log('error caught in getEvents service')
        // console.error(err);
        return throwError(err);
      })
    );;
  }


}
