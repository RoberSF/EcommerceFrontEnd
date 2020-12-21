import { Component, OnInit } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from '../../../services/users.service';
import caroulselItems from '@data/carousel.json';
import productList from '@data/products.json';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: ICarouselItem[] = [];​ 
  productList; 
  listOne;
  listTwo;
  listThree;

  constructor(private apiService: ApiService, private auth: AuthService, private userService: UsersService) { }

  ngOnInit(): void {

    // Traer los valores cargados en el carousel.json u otros  }
    this.items = caroulselItems;
    this.productList = productList;
    this.listOne = this.fakeRandomProductList();
    this.listTwo = this.fakeRandomProductList();
    this.listThree = this.fakeRandomProductList();

    //Obtenemos la data del servicio
    // this.auth.login('test1@gmail.com', '123').subscribe((data) => {
    //   console.log(data);
    // });

    // Obtenemos la información de los usuarios
    this.userService.getUsers(1,2).subscribe((data) => {
      // console.log(data);
    })

    this.auth.getMe().subscribe((data) => {
      // console.log(data);
    })
  }

  fakeRandomProductList() {
    const list = [];
    const arrayMax = 4;
    const limit = this.productList.length;
    for (let i = 0; i < arrayMax; i++) {
      list.push(this.productList[Math.floor(Math.random() * limit)])
    }
    return list
  }

}
