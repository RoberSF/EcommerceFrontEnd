import gql from 'graphql-tag';
import { PAYMENT_FRAGMENT } from '../../fragment/charges';



export const STRIPE_PAYMENT = gql` 

mutation pagarPedido($payment: ChargeInput!) {
    chargeOrder(payment: $payment) {
      status
      message
      charge {
        ...ChargeObject
      }
    }
  }
  ${PAYMENT_FRAGMENT}
  `;





