import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }


  //**************************************************************************************************
  //        Consumir servicios de la Api                                                           
  //**************************************************************************************************
  
  login( email: string, passwrod: string) {  }

  getUsers(){  }

  getMe(){}

  register() {}
  
}
