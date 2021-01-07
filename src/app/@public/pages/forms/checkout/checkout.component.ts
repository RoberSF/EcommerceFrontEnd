import { Component, OnInit } from '@angular/core';
import { IMeData } from '../../../core/Interfaces/ISession';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { StripePaymentService } from '@mugan86/stripe-payment-form';
import { take } from 'rxjs/internal/operators/take';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { infoEventAlert } from 'src/app/@shared/alerts/alerts';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  meData: IMeData;
  key = environment.stripePublicKey;
  address = '';

  constructor(private authService: AuthService, 
    private router: Router, 
    private stripePaymentService: StripePaymentService,
    private shoppingCartService: ShoppingCartService) {
    
    this.authService.accessVar$.subscribe( (data: IMeData) => { 
      // Comprobamos el status para validación y o redirigir
      if ( !data.status) {
          this.router.navigate( ['/login']);
          return
      }
      this.meData = data;
    })

    this.stripePaymentService.cardTokenVar$.pipe(take(1)).subscribe( (token: string) => { //take() hace que sólo se ejecute una vez, si no puede que el pago se hiciera varias veces
      console.log(token);
      if ( token.indexOf('tok_') > -1 && this.meData.status && this.address !== '') {
          // Podemos enviar los datos
          console.log('Podemos enviar la info');
          // Descripción del pedido. Tenemos que crear función en el carrito
          // Divisa
          // Cliente de stripe
          // Total a pagar
      }
    })
   }

  ngOnInit() {
    this.authService.start();
    this.shoppingCartService.initializeCart();
  }

  sendData() {
    // Si no soy cliente de stripe no puede hacer el pago
    if ( this.meData.user.stripeCustomer === null ) {
      // Alerta para mostrar info
      infoEventAlert('Cliente no existe', 'Necesitamos un cliente para realizar el pago')
      return
    }
    this.stripePaymentService.takeCardToken(true);
  }

}
