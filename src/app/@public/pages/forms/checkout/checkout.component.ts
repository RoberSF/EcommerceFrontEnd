import { Component, OnInit } from '@angular/core';
import { IMeData } from '../../../core/Interfaces/ISession';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { StripePaymentService } from '@mugan86/stripe-payment-form';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  meData: IMeData;
  key = environment.stripePublicKey;
  address = '';

  constructor(private authService: AuthService, private router: Router, private stripePaymentService: StripePaymentService) {
    this.authService.accessVar$.subscribe( (data: IMeData) => {
      // Comprobamos el status para validación y o redirigir
      if ( !data.status) {
          this.router.navigate( ['/login']);
          return
      }
      this.meData = data;
    })

    this.stripePaymentService.cardTokenVar$.subscribe( (token: string) => {
      console.log(token);
      if ( token.indexOf('tok_') > -1 && this.meData.status && this.address !== '') {
          // Podemos enviar los datos
          console.log('Podemos enviar la info');
      }
    })
   }

  ngOnInit() {
    this.authService.start();
  }

  sendData() {
    this.stripePaymentService.takeCardToken(true);
  }

}
