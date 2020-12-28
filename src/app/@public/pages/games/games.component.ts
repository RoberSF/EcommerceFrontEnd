import { Component, OnInit } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ACTIVE_FILTERS } from 'src/app/@shared/constants/filter';
import { ProductService } from '../../../services/product.service';
import { IInfoPage } from '../../core/Interfaces/IResultData';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  title = 'Título de la categoría';
  productList: Array<IProduct> = [];
  selectPage;
  infoPage: IInfoPage = {
    page: 1,
    pages: 8,
    total: 160,
    itemsPerPage: 20
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadData()
  }
  
  loadData() {
    this.productService.getByPlatform(this.infoPage.page,this.infoPage.itemsPerPage, ACTIVE_FILTERS.ACTIVE, '18' ,false, true ).subscribe((data) => {
      this.productList = data.result;
      this.infoPage = data.info
    })
  };


}
