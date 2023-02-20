import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  

  constructor(private auth: AuthService, private router:Router, private toastr: ToastrService){};

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    let rt:string = route.url.toString();

    if(this.auth.isLoggedIn()){
      
      return true;
    }else{
    
      this.toastr.error('Login First', 'Please Login first', {
        timeOut:2000,
      })
      this.router.navigate(['/']);
      return false;
    }



  }
  
}
   

