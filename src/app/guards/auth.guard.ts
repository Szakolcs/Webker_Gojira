import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {take} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.authService.currentUser.pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        }

        alert('Access denied - Not authenticated');
        this.router.navigate(['/login']).then(r => {});
        return false;
      })
    );
  }
}
