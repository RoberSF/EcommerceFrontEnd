import gql from 'graphql-tag';
import { USER_FRAGMENT } from '@graphql/operations/fragment/user';



// export const CREATE_CUSTOMER = gql`

// mutation addUser($user: UserInput!, $include: Boolean!) {
//     register(user: $user) {
//       status
//       message
//       user {
//         ...UserObject
//       }
//     }
//   }
//   ${ USER_FRAGMENT }
//   `;

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





