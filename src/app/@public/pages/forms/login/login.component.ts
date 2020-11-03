import { Component, OnInit } from '@angular/core';
import { ILogin } from '@shop/core/Interfaces/loginForm';
import { AuthService } from '../../../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IResultLogin } from '../../../core/Interfaces/loginForm';
import Swal from 'sweetalert2'
import { IMeData } from '@shop/core/Interfaces/session';

declare function init_plugins();//de esta manera podemos llamar a cualquier script que esté fuera de angular y ponerlo
//en cualquier archivo de JSJ,TS

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: ILogin = {
    email: '',
    password: ''
  }
  rememeberme = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    init_plugins();
    //this.auth.start();
  }

  logIn(form: NgForm) {

    this.auth.login(this.login.email, this.login.password).subscribe((result: IResultLogin) => {
      console.log(result);
      if(result.status && result.token !== null) {
        this.auth.saveSession(result.token);
        this.auth.updateSession(result);
        Swal.fire({
          title: 'Inicio se sesión corecto',
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
      }
    })
    // let usuario: Usuario = new Usuario(null, form.value.email, form.value.password);

    // this.usuarioService.login(usuario, form.value.rememberme).subscribe(response => {
    //   console.log(response);
      //this.router.navigate(['/dashboard'])
    //})
  }
}
