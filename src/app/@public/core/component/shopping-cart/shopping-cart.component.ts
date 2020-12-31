import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { IShoppingCart } from '../../Interfaces/IShoppingCart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoopingCart: IShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { 

    // Escuchamos el observable del ShoppingService
    this.shoppingCartService.itemsVar$.subscribe( (data: IShoppingCart) => {
      if ( data !== undefined && data !== null) {
        this.shoopingCart = data;
      }
    })
  }

  ngOnInit(){
    this.shoopingCart = this.shoppingCartService.initializeCart()
  }

  clear() {
    this.shoppingCartService.clear()
  }

  closeNav() {
    this.shoppingCartService.closeNav()
  }


}
