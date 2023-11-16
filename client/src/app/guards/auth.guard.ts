import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
      return this.checkUserLoggedIn(state.url);
    }
  
    checkUserLoggedIn(url: string): boolean | UrlTree {
      if (localStorage.getItem('user')) {
        return true;
      } else {
        return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: url } });
      }
    }
  }