import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import productList from '@data/products.json';

@Component({
  selector: 'app-product-categori-list',
  templateUrl: './product-categori-list.component.html',
  styleUrls: ['./product-categori-list.component.scss']
})
export class ProductCategoriListComponent implements OnInit {

  @Input() title = 'Título de la categoría';
  @Input() productList: Array<IProduct> = [];
  @Input() description = ''

  constructor() { }

  ngOnInit(): void {
  }

  addToCart($event: IProduct) {

  }

  showProductDetails($event: IProduct) {

  }

}
