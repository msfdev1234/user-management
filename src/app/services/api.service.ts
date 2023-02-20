import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl:String = "https://localhost:7158/api/User/"
  constructor(private http : HttpClient) { }

  getallUser(token:string){

    return this.http.get<any>(`${this.baseUrl}users`);

  }
}
