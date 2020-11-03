import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { LOGIN_QUERY,ME_DATA_QUERY } from '@graphql/operations/query/user';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators'
import { HttpHeaders } from '@angular/common/http';
import { ISession } from '../@public/core/Interfaces/session';
import { IMeData } from '@shop/core/Interfaces/session';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  //**************************************************************************************************
  //  Para usar propiedades de api.service lo extendemos a esta clase hija
  //  Como la clase padre tiene un constructor que inicia apollo, la hija tiene que hacer lo mismo, 
  //  por este motivo se pone el super                                                        
  //**************************************************************************************************
  
  accessVar = new Subject<IMeData>();
  accessVar$ = this.accessVar.asObservable();

  constructor(apollo:Apollo) { 
    super(apollo);
  }


updateSession(newValue: IMeData) {
   this.accessVar.next(newValue);
}

getSession(): ISession {
  return JSON.parse(localStorage.getItem('session'));
}


saveSession(token: string, expiresTimeInHours = 24) {
  const date = new Date();
   date.setHours(date.getHours() + expiresTimeInHours);

  const session: ISession = {
    expiresIn: new Date(date).toISOString(),
    token
  };
  localStorage.setItem('session', JSON.stringify(session));
}

start() {
  if (this.getSession() !== null) {

    this.getMe().subscribe( (result: IMeData) => {
      if( !result.status) {
          this.resetSession();
          return
      }
      this.updateSession(result);
    })
    console.log('Session Iniciada');
    return
  }
  this.updateSession({
    status:false
  });
  console.log('Sesion no iniciada');
};

// Método de utilización de las funciones de graphql que consume la Api
login(email: String, password: String) { 
  return this.get(LOGIN_QUERY, {email,password,include: false}).pipe(map((result:any) => {
    this.updateSession({status:true})
    return result.login;
  })
  )};

  getMe(){
    return this.get(ME_DATA_QUERY,{include: false},
       { headers: new HttpHeaders({
          Authorization: (this.getSession() as ISession).token
        })
      }).pipe(map((result:any) => {
      return  result.me;
    }));
  }


  resetSession() {
    localStorage.removeItem('session');
    this.updateSession({status:false});
  }
}
