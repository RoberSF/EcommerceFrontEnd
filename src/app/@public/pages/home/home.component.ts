import { Component, OnInit } from '@angular/core';
import { ApiService } from '@grapql/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    
    //Obtenemos la data del servicio
    this.apiService.login('test1@gmail.com', '123').subscribe((data) => {
      console.log(data);
    });
  }

}
