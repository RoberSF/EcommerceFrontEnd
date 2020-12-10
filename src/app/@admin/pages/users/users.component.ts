import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '../../../@public/core/Interfaces/result-data-interface';
import { USERS_LIST_QUERY } from '../../../@graphql/operations/query/user';
import { ITableColumns } from '../../../@public/core/Interfaces/table-columns.iterface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  query: DocumentNode = USERS_LIST_QUERY;
  context: object;
  itemsPerPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>

  ngOnInit(): void {
    this.context = {};
    this.itemsPerPage = 10;
    this.resultData = {
      listKey: 'users',
      definitionKey: 'users'
    };
    this.include = true;
    this.columns = [
      {
        property: 'id',
        label: '#'
      },
      {
        property: 'name',
        label: 'Nombre'
      },
      {
        property: 'lastname',
        label: 'Last Name'
      },
      {
        property: 'email',
        label: 'Email'
      },
      {
        property: 'registerDate',
        label: 'Register Date'
      },
      {
        property: 'birthday',
        label: 'Birthday'
      },
      {
        property: 'role',
        label: 'Role'
      },
    ]
  }

}
