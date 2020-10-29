import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_QUERY, USERS_LIST_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';
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
      },
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(map((result) => {
      return result.data
    })
    )};


  
  getUsers(){ 
    return this.apollo.watchQuery(
      {
      query: USERS_LIST_QUERY,
      variables: {
        include: true
      },
      fetchPolicy: 'network-only'

      }
    ).valueChanges.pipe(map((result) => {
      return  result.data;
    }));
    }

  getMe(){
    return this.apollo.watchQuery({
      query: ME_DATA_QUERY,
      variables: {
        include: false
      },
      context: {
        headers: {
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmOTdkZDc4ZDFjZmYyM2NlODk5MDIzMyIsIm5hbWUiOiJBbGV4IiwibGFzdG5hbWUiOiJTYW5jaGV6IiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpZCI6Mn0sImlhdCI6MTYwNDAwNTExNCwiZXhwIjoxNjA0MDkxNTE0fQ.ja9ufuO0ZGGlD1CbBus9RxBXdQUyDTof_iDyzmUwppg'
        }
      },
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(map((result) => {
      return  result.data;
    }));
  }

  register() {}

}
