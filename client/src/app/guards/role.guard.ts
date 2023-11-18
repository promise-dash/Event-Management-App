import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: ApiService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const user = this.authService.user;
    if (user.role === 'Admin' || user.role === 'Organizer') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}