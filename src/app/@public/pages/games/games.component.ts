import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { IGamePageInfo } from '@shop/core/Interfaces/IGamesPageInfo';
import { ACTIVE_FILTERS } from 'src/app/@shared/constants/filter';
import { GAMES_PAGES_INFO } from 'src/app/@shared/constants/game.constants';
import { ProductService } from '../../../services/product.service';
import { IInfoPage } from '../../core/Interfaces/IResultData';
import { TYPE_OPERATION } from '../../../@shared/constants/game.constants';
import { closeAlert, loadData } from 'src/app/@shared/alerts/alerts';

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
  gamesPageInfo: IGamePageInfo;
  typeData: TYPE_OPERATION;
  loading: boolean;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
      this.loading = true;
      loadData('Loading', `<div class="lds-roller"><div>`);
      this.typeData = params.type;
      this.selectPage = 1; // Cada vez que se cargue la página empezamos a contar desde la pag 1
      this.gamesPageInfo = GAMES_PAGES_INFO[`${params.type}/${params.filter}`]
      this.loadData() //cada vez que cambiemos de página haremos un "refresh" de la data
      this.loading = false;
    })
  }
  
  loadData() {
    if( this.typeData === TYPE_OPERATION.PLATFORMS) {
      this.productService.getByPlatform(this.selectPage,this.infoPage.itemsPerPage, ACTIVE_FILTERS.ACTIVE, this.gamesPageInfo.platformsIds ,false, true, true).subscribe((data) => {
        this.asingResult(data)
        return
      })
    }
    this.productService.getByLastUnitsOffers(this.selectPage,this.infoPage.itemsPerPage, ACTIVE_FILTERS.ACTIVE, false, this.gamesPageInfo.topPrice, this.gamesPageInfo.stock, true, true).subscribe((data) => {
      this.asingResult(data)
      return
    })
  };


  private asingResult(data) {
    this.productList = data.result;
    this.infoPage = data.info;
    closeAlert();
    this.loading = false;
  }


}
