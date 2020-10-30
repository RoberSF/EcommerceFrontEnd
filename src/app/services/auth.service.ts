import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { LOGIN_QUERY,ME_DATA_QUERY } from '@graphql/operations/query/user';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators'
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  //**************************************************************************************************
  //  Para usar propiedades de api.service lo extendemos a esta clase hija
  //  Como la clase padre tiene un constructor que inicia apollo, la hija tiene que hacer lo mismo, 
  //  por este motivo se pone el super                                                        
  //**************************************************************************************************
  
  constructor(apollo:Apollo) { 
    super(apollo);
  }


// Método de utilización de las funciones de graphql que consume la Api
login(email: String, password: String) { 
  return this.get(LOGIN_QUERY, {email,password}).pipe(map((result:any) => {
    return result.login;
  })
  )};

  getMe(){
    return this.get(ME_DATA_QUERY,{include: false},
       { headers: new HttpHeaders({
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmOTdkZDc4ZDFjZmYyM2NlODk5MDIzMyIsIm5hbWUiOiJBbGV4IiwibGFzdG5hbWUiOiJTYW5jaGV6IiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpZCI6Mn0sImlhdCI6MTYwNDAwNTExNCwiZXhwIjoxNjA0MDkxNTE0fQ.ja9ufuO0ZGGlD1CbBus9RxBXdQUyDTof_iDyzmUwppg'
        })
      }).pipe(map((result:any) => {
      return  result.me;
    }));
  }
}
