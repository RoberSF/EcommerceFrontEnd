import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_QUERY } from '../operations/query/user';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }


  //**************************************************************************************************
  //        Consumir servicios de la Api hecha con graphql                                                          
  //**************************************************************************************************
  
  // Método de utilización de las funciones de graphql que consume la Api
  login( email: string, password: string) { 
    return this.apollo.watchQuery({
      query: LOGIN_QUERY,
      variables: {
        email: email,
        password: password,
      }
    }).valueChanges.pipe(map((result) => {
      return result.data
    })
    )};

  getUsers(){  }

  getMe(){}

  register() {}

}
