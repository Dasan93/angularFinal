import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot) {
    console.log(route.url[0].path);
    if (!localStorage.getItem("rol")) {
      console.log('No estás logueado');
      this.router.navigate(['/inicio']);
      return false;
    }

    if (localStorage.getItem("rol") == 'Rol_Barras' && route.url[0].path != 'histograma' ||
      localStorage.getItem("rol") == 'Rol_Pie' && route.url[0].path != 'top5') {
      console.log('No tienes permiso');
      this.router.navigate(['/inicio']);
      return false;
    }

    return true;
  }
}