import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HeaderComponent } from '@shop-core/component/header/header.component';
import { NavbarComponent } from '@shop-core/component/navbar/navbar.component';
import { FooterComponent } from '@shop/core/component/footer/footer.component';


@NgModule({
  declarations: [PublicComponent, HeaderComponent, NavbarComponent,FooterComponent],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
