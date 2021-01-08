import { Component, OnInit } from '@angular/core';
import { IMeData } from '../../../core/Interfaces/ISession';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { StripePaymentService } from '@mugan86/stripe-payment-form';
import { take } from 'rxjs/internal/operators/take';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';
import { infoEventAlert } from 'src/app/@shared/alerts/alerts';
import { CustomerService } from '../../../../services/stripe/customer.service';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { loadData } from '../../../../@shared/alerts/alerts';
import { ChargesService } from '../../../../services/stripe/charges.service';
import { IPayment } from '../../../core/Interfaces/stripe/IStripeDescription';
import { CURRENCY_CODE } from '../../../../@shared/constants/config';

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
    private shoppingCartService: ShoppingCartService,
    private customerService: CustomerService,
    private chargesService: ChargesService) {
    
    this.authService.accessVar$.subscribe( (data: IMeData) => { 
      // Comprobamos el status para validación y o redirigir. Comprobamos que haya sesión iniciada(que estemos registrados)
      if ( !data.status) {
          this.router.navigate( ['/login']);
          return
      }
      this.meData = data;
    })
  
    // El servicio es creado directamente por la librería de anatz
    this.stripePaymentService.cardTokenVar$.pipe(take(1)).subscribe( (token: string) => { //take() hace que sólo se ejecute una vez, si no puede que el pago se hiciera varias veces
      if ( token.indexOf('tok_') > -1 && this.meData.status && this.address !== '') {
          // Podemos enviar los datos
          console.log('Podemos enviar la info');
          // Descripción del pedido. Tenemos que crear función en el carrito
          // Divisa
          // Cliente de stripe
          // Total a pagar
          // Descripción del pedido en función del carrito
          this.shoppingCartService.orderDescription()
          // Almacenar la información para enviar a stripe
          const payment: IPayment = {
            token,
            amount: this.shoppingCartService.shoppingCart.total.toString(),
            description: this.shoppingCartService.orderDescription(),
            customer: this.meData.user.stripeCustomer,
            currency: CURRENCY_CODE
           }
          // Enviar la información y procesar el pago
          this.chargesService.pay(payment).pipe(take(1)).subscribe( (result: {status: boolean, message: string, charge: object}) => {
            if ( result.status) {
              console.log('pago ok');
              console.log(result.charge);
            } else {
              console.log(result.message);
            }
          })
      }
    })
   }

  ngOnInit() {
    this.authService.start();
    // Después de redirigir, al recargar que vea si hay info del checkout y que la rellene automáticamente
    if ( localStorage.getItem('address')) {
      // La asignamos para el envío nuevamente
      this.address = localStorage.getItem('address')
      // Lo eliminamos del localstorage para que no haya conflictos en el futuro
      localStorage.removeItem('address')
    }
    // Inicializamos el carrito para poder enviar la información con el montante final
    this.shoppingCartService.initializeCart();
    // Eliminamos la ruta puesta después de redirigir tras habernos creado en stripe
    localStorage.removeItem('route_after_login')
  }

  async sendData() {
    // Si no soy cliente de stripe no puede hacer el pago por lo que debemos registrar al cliente
    if ( this.meData.user.stripeCustomer === null ) {
      // Alerta para mostrar info respecto lo vamos a añadir a stripe
      await infoEventAlert('Cliente no existe', 'Necesitamos un cliente para realizar el pago')
      loadData('Procesando la información', 'Creando el cliente')
      // El nombre del cliente concatenado
      const stripeName = `${this.meData.user.name} ${this.meData.user.lastname}`;
      // Llamada a la api de graphql para crear cliente. Sólo cogemos un click con el take(1). Nuestra api ya se encarga de guardarlo en nuestra DB
      // El cliente se creará si en la api de stripe no existe el usuario
      this.customerService.createClientStripe(stripeName, this.meData.user.email).pipe(take(1)).subscribe( async (result: {status: boolean, message: string}) => {
        if ( result.status ) {
          await infoEventAlert('Cliente añadido al usuario', 'Reiniciar la sesión', TYPE_ALERT.SUCCESS);
          // Guardamos esta info para tras el redireccionar de venir de stripe tengamos la info del envío
          localStorage.setItem('address', this.address)
          // Guardamos la ruta para tras el redireccionar volvamos al checkout
          localStorage.setItem('route_after_login', this.router.url)
          this.authService.resetSession()
        } else {
          await infoEventAlert('Cliente no añadido al usuario', result.message, TYPE_ALERT.WARNING);

        }
      })
      return
    }
    // La función ya viene creada con la librería. Necesitamos configurar los enviroments para que coja la apiKey de stripe
    this.stripePaymentService.takeCardToken(true);
  }

}
