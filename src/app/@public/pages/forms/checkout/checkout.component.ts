import { Component, OnInit } from '@angular/core';
import { IMeData } from '../../../core/Interfaces/ISession';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  meData: IMeData;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.accessVar$.subscribe( (data: IMeData) => {
      // Comprobamos el status para validación y o redirigir
      if ( !data.status) {
          this.router.navigate( ['/login']);
          return
      }
      this.meData = data;
    })
   }

  ngOnInit() {
    this.authService.start();
  }

}
