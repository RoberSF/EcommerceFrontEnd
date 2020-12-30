//**************************************************************************************************
//    Definición de los objetos de la Api para poder ser rehutilizados en diferentes querys o mutations                                                           
//**************************************************************************************************
import gql from 'graphql-tag';

export const PRODUCT_FRAGMENT = gql `

fragment ProductObject on Product {
          id
          price
          stock
          active
          productId
          product {
            id
            name
            slug
            img
            rating{ value count}
            screenshoot  @include(if: $similarAndScreen)
          },
          platform @include(if: $showPlatform) {
            id
            name
            slug
            active
          },
          similarProducts @include(if: $similarAndScreen){ 
            id
            platform {
            id
            name
            }  
          }  
}
`


