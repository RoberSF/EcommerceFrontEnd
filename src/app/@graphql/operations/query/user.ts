import gql from 'graphql-tag';


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


