import gql from 'graphql-tag';
import { USER_FRAGMENT } from '@graphql/operations/fragment/user';


//**************************************************************************************************
//    Forma de hacer las querys a graphql                                                           
//**************************************************************************************************

export const LOGIN_QUERY = gql`
 query getLogin($email:string!, $password:string!){

    login(email: $email, password: $password) {
      status
      message
      token
    }
  }
  `;

//Sería ponerlo igual que lo haríamos en apollo server
export const USER_LIST_QUERY = gql`
 query {
     users {
        status
        message
        users {
            ...UserObject
        }
     }
    ${USER_FRAGMENT}
 }
  `;




