import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import productList from '@data/products.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-categori-list',
  templateUrl: './product-categori-list.component.html',
  styleUrls: ['./product-categori-list.component.scss']
})
export class ProductCategoriListComponent implements OnInit {

  @Input() title = 'Título de la categoría';
  @Input() productList: Array<IProduct> = [];
  @Input() description = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addToCart($event: IProduct) {

  }

  showProductDetails($event: IProduct) {
    this.router.navigate(['/games/details/', $event.id])
  }

}
