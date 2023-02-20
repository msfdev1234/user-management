import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  public users!:any[];

  constructor(private auth:AuthService, private api: ApiService, private toastr: ToastrService){}

  logOut(): void{
     this.auth.logout();
    
  }


  ngOnInit(): void {
   this.api.getallUser("ad").subscribe(res => {
    this.users = res;
   });
  }

}

