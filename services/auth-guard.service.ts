import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }
    canActivate() {
      return true;
        if ( this.authService.isLoggedIn() ) {
            return true;
        }
        console.info('not logged in');
        this.authService.signInWithPopup();
        return false;
    }
}