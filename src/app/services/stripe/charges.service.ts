import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { IPayment } from '../../@public/core/Interfaces/stripe/IStripeDescription';
import { STRIPE_PAYMENT } from '../../@graphql/operations/mutation/stripe/charges';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ChargesService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}

pay(payment: IPayment) {
    return this.set(STRIPE_PAYMENT, {payment}).pipe(map( (result: any) => {
            return result.chargeOrder
    }))

}

}
