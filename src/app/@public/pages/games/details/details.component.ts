import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { loadData } from 'src/app/@shared/alerts/alerts';
import { closeAlert } from '../../../../@shared/alerts/alerts';
import { CURRENCY_SELECTED } from '../../../../@shared/constants/config';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  product: IProduct;
  selectImage:string;
  currencySelect = CURRENCY_SELECTED
  screenshoots = [];
  similarProducts: Array<any> = [];
  randomItems: Array<any> = [];
  loading:boolean;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router,
                private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
      this.loadDataValue(+params.id)
      loadData('Loading', `<div class="lds-roller"><div>`);
      this.loading = true
      this.productService.itemsRandom().subscribe( result => {
        this.randomItems = result
      })
    })

  }

  changeValue(qty: number) {
      this.product.qty = qty
  }

  selectImg(i) {
    this.selectImage = this.screenshoots[i] //con el i lo que hago es pasarle la posición del Array
  }

  otherPlatform(event){
    this.loadDataValue(+event.target.value)
  }


  loadDataValue(id: number) {
      this.productService.getItem(id).subscribe( (result:any) => { //el "+" es para pasar a tipo number
      this.product = result.product;
      this.selectImage = this.product.img;
      this.screenshoots = result.screenshoots;
      this.similarProducts = result.similarProducts;
      this.loading = false
      closeAlert();
      })
  }

  itemDetail(id: number) {
    this.router.navigate(['/games/details/', id])
  }

  addToCart() {
    this.shoppingCartService.manageProduct(this.product)
  }

}

