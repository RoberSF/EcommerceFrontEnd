import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_QUERY, USERS_LIST_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';
import {map} from 'rxjs/operators'
import { DocumentNode } from 'graphql';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  // Ponemos protected para que solo se pueda acceder a ella desde el hijo o en la propia clase
  protected get(query: DocumentNode, variables: object = {}, context: object = {}) {
    return this.apollo.watchQuery({
      query,
      variables,
      context,
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(map((result) => {
      return result.data
    })
    )}

  //**************************************************************************************************
  //        Consumir servicios de la Api hecha con graphql                                                          
  //**************************************************************************************************
  

  register() {}

}
