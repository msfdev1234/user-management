import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:String = "https://localhost:7158/api/User/"
  constructor(private http : HttpClient, private router: Router,  private toastr: ToastrService) { }

  signUp(userObj : any){

    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }

  login(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.router.navigate(['/']);
    this.toastr.info("Logout successfull","",{
      timeOut:2000,
    });
  }

  storeToken(TokenValue:string){
    localStorage.setItem("token", TokenValue)
  }

  storeCurrentUser(Name:string){
    localStorage.setItem("name", Name)
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getCurrentUserName(){
    return localStorage.getItem("name");
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem("token");
  }
}
