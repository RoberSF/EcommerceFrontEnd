import { Component, OnInit } from '@angular/core';
import products from '@data/products.json';
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  product = products[0];
  selectImage = this.product.img;
  currencySelect = CURRENCIES_SYMBOL[CURRENCY_LIST.EURO];
  screenshoots = [
    'https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg',
  'https://media.rawg.io/media/screenshots/1b4/1b4eefb4cc2a77d4d35bb4a6926f3189.jpg',
  'https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg',
  'https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg',
  'https://media.rawg.io/media/screenshots/f95/f9518b1d99210c0cae21fc09e95b4e31.jpg',
  'https://media.rawg.io/media/screenshots/2dc/2dc7ea94641f7329d177f228564b968a.jpg',
  'https://media.rawg.io/media/screenshots/a5c/a5c95ea539c87d5f538763e16e18fb99.jpg'
    ]

  constructor() { }

  ngOnInit(): void {
  }

  changeValue($event) {

  }

  selectImg(i) {
    console.log(i);
    this.selectImage = this.screenshoots[i] //con el i lo que hago es pasarle la posición del Array
  }
}

