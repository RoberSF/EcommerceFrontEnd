import { Injectable } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { IShoppingCart } from '../@public/core/Interfaces/IShoppingCart';
import products from '@data/products.json';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  products: Array<IProduct> = [];
  shoppingCart: IShoppingCart = {
    total: 0,
    subtotal: 0,
    products: this.products
  };


  //**************************************************************************************************
  //       Inicializar el carrito de compra para tener la info giardada                                                           
  //**************************************************************************************************
  
  initializeCart() {
    const storeData = JSON.parse(localStorage.getItem('cart'));
    if ( storeData != null ) {
      this.shoppingCart = storeData;
    }
    return this.shoppingCart;
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("app-body").style.overflow = "auto";
  }
  
  openNav() {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("app-body").style.overflow = "hidden";
  }
}
