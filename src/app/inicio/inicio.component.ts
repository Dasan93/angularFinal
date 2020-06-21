import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

const URL_API = environment.API.EndPoints.Login;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    localStorage.removeItem('rol');
  }

  onSubmit(event: any) {
    console.log(event.target.email.value);
    console.log(event.target.password.value);

    const body = {
      email: event.target.email.value,
      password: event.target.password.value
    };

    this.http.post(`${URL_API}api/auth/login`, body).subscribe(data => {
      localStorage.setItem("rol", data['payload']['rol']);
      
      console.log(data['payload']['rol']);
    });
  }
}