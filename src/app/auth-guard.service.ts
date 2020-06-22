import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponentComponent } from './pages/dialog-example-component/dialog-example-component.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router,public dialog:MatDialog) { }


  canActivate(route: ActivatedRouteSnapshot) {
    console.log(route.url[0].path);
    if (!localStorage.getItem("rol")) {
      console.log('Primero necesitas hacer login');
      //this.dialog.open(DialogExampleComponentComponent,{data:{Mensaje:'No estás logueado'}});
      this.router.navigate(['/Login']);
      return false;
    }

    if (localStorage.getItem("rol") == 'Rol_Barras' && route.url[0].path != 'Barra' ||
      localStorage.getItem("rol") == 'Rol_Pie' && route.url[0].path != 'Pie') {
      NavbarComponent
      //this.dialog.open(DialogExampleComponentComponent,{data:{Mensaje:'No tienes permiso'}});
      console.log('No tienes autorización para acceder a este módulo');
      this.router.navigate(['/Login']);
      return false;
    }
    //console.log('Si si awebo');
    return true;
  }
}