import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { IShoppingCart } from '../../Interfaces/IShoppingCart';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

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
  // Para borrar todos los elementos
  clear() {
    this.shoppingCartService.clear()
  }
  // Para borrar un elemento
  clearItem(product: IProduct){
    product.qty = 0;
    this.shoppingCartService.manageProduct(product);
  }

  closeNav() {
    this.shoppingCartService.closeNav()
  }


}
