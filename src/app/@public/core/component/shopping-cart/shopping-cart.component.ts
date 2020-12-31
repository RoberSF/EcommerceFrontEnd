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

  constructor(private shoppingCart: ShoppingCartService) { }

  ngOnInit(){
    this.shoopingCart = this.shoppingCart.initializeCart()
  }

  closeNav() {
    this.shoppingCart.closeNav()
  }


}
