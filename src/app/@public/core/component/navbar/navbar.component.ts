import { Component, OnInit } from '@angular/core';
import { IMeData } from '@shop/core/Interfaces/ISession';
import { AuthService } from 'src/app/services/auth.service';
import shopMenuItems from '@data/menus/shopNavbar.json';
import { IMenuItem } from '@shop/core/Interfaces/IMenuItemNavbar';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { REDIRECT_ROUTES } from 'src/app/@shared/constants/config';
import { Router } from '@angular/router';
import { IShoppingCart } from '../../Interfaces/IShoppingCart';
import { optionsWithDetails } from 'src/app/@shared/alerts/alerts';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  shoppingCartItemsTotal: number;
  menuItems: Array<IMenuItem> = shopMenuItems;
  session: IMeData = {
    status: false
  };
  access = false;
  role: string;
  userLabel = '';
  constructor(private authService: AuthService, private shoppingCartService: ShoppingCartService, private router: Router) {
    this.authService.accessVar$.subscribe((result) => {
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `${ this.session.user?.name } ${ this.session.user?.lastname }`;
    });
    this.shoppingCartService.itemsVar$.subscribe( (data: IShoppingCart) => {
      if ( data !== undefined && data !== null) {
        this.shoppingCartItemsTotal = data.subtotal
      }
    })
  }

  ngOnInit(): void {
    this.shoppingCartItemsTotal = this.shoppingCartService.initializeCart().subtotal
  }

  async logout() {

    const result = await optionsWithDetails(
      'Cerrar sesión',
      'Estás seguro que quieres cerrar la sesión?',
      400,
      'Si, cerrar', //true
      'No, permanecer' //false
    );

    if ( !result) {
      return
    }
    
    // rutas que usaremos para redireccionar
    if ( REDIRECT_ROUTES.includes(this.router.url)) {// con includes() comprobamos si existe esa url en la constante
      localStorage.setItem('route_after_login', this.router.url);
    } 
    // En caso de encontrarla, marcamos para que redireccione
    this.authService.resetSession();
  }

  openNav() {
    this.shoppingCartService.openNav()
  }

}
