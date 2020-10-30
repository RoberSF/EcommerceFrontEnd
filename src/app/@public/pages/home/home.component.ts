import { Component, OnInit } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService, private auth: AuthService, private userService: UsersService) { }

  ngOnInit(): void {

    //Obtenemos la data del servicio
    this.auth.login('test1@gmail.com', '123').subscribe((data) => {
      console.log(data);
    });

    // Obtenemos la información de los usuarios
    this.userService.getUsers().subscribe((data) => {
      console.log(data);
    })

    this.auth.getMe().subscribe((data) => {
      console.log(data);
    })
  }

}
