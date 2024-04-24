import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, ReplaySubject, map } from 'rxjs';
import { IUser } from '../shared/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnInit {
  baseUrl = environment.baseURL;
  private currentUser = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {}

  register(values: any) {
    return this.http.post(this.baseUrl + 'Account/Register', values).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
        this.currentUser.next(user);
      })
    );
  }
  login(values: any) {
    return this.http.post(this.baseUrl + 'Account/Login', values).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
        this.currentUser.next(user);
      })
    );
  }
  logout(){
    localStorage.removeItem('token');
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
  }
  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'Account/check-email-exist?email=' + email);
  }
  getUserAddress() {
    return this.http.get(this.baseUrl + 'Account/get-user-address');
  }
  updateUserAddress(address: any){
    return this.http.put(this.baseUrl + 'Account/update-user-address', address);
  }
  loadCurrentUser(token: string){
    if(token === null){
      this.currentUser.next(null);
      return new Observable();
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this.http
      .get(this.baseUrl + 'get-current-user', {
        headers
      })
      .pipe(
        map((user: IUser) => {
          if(user){
            localStorage.setItem('token', user.token);
            this.currentUser.next(user);
          } else {
            this.currentUser.next(null);
          }
        })
      );
  }
}
