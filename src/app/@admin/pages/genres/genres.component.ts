import { Component, OnInit } from '@angular/core';
import { GENRE_LIST_QUERY } from '@graphql/operations/query/genre';
import { ITableColumns } from '@shop/core/Interfaces/table-columns.iterface';
import { DocumentNode } from 'graphql';
import { IResultData } from '../../../@public/core/Interfaces/result-data-interface';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit  {


  query: DocumentNode = GENRE_LIST_QUERY;
  context: object;
  itemsPerPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>

  ngOnInit(): void {
    this.context = {};
    this.itemsPerPage = 10;
    this.resultData = {
      listKey: 'genres',
      definitionKey: 'genres'
    };
    this.include = false
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
        property: 'slug',
        label: 'Slug'
      },
    ]
  }



}
