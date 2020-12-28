import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { ProductCategoriListModule } from '../../../@shared/product-categori-list/product-categori-list.module';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    ProductCategoriListModule,
    FormsModule,
    NgbPaginationModule
  ]
})
export class GamesModule { }
