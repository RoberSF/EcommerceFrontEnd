import gql from 'graphql-tag';
import { USER_FRAGMENT } from '@graphql/operations/fragment/user';


export const CREATE_CUSTOMER = gql` 

mutation createClient($name: String!, $email: String!) {
    createCustomer( name: $name, email: $email) {
      status
      message
      customer {
        id
        name
        email
        description
      }
    }
  }
  `





