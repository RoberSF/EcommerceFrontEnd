import { Component, OnInit } from '@angular/core';
import { IMeData } from '@shop/core/Interfaces/session';
import { AuthService } from 'src/app/services/auth.service';
import shopMenuItems from '@data/menus/shopNavbar.json';
import { IMenuItem } from '@shop/core/Interfaces/menuItemNavbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuItems: Array<IMenuItem> = shopMenuItems;
  session: IMeData = {
    status: false
  };
  access = false;
  role: string;
  userLabel = '';
  constructor(private authService: AuthService) {
    this.authService.accessVar$.subscribe((result) => {
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `${ this.session.user?.name } ${ this.session.user?.lastname }`;
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.resetSession();
  }

}
