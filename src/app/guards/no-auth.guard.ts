import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/users/token.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard  {

  constructor(private tokenService: TokenService, private router: Router) {
  }
  canActivate() {
    var token = this.tokenService.getToken();
    if (token) {
      this.router.navigate(['/statistics']);
      return false;
    }
    return true;
  }
}
