//**************************************************************************************************
//    Definición de los objetos de la Api para poder ser rehutilizados en diferentes querys o mutations                                                           
//**************************************************************************************************
import gql from 'graphql-tag';


export const USER_FRAGMENT = gql`fragment UserObject on User {
            id
            name
            lastname
            email
            password
            registerDate
            birthday
      }
}
`;