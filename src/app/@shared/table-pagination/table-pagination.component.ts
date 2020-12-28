import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentNode } from 'graphql';
import { TablePaginationService } from './table-pagination.service';
import { USERS_LIST_QUERY } from '../../@graphql/operations/query/user';
import { IResultData, IInfoPage } from '../../@public/core/Interfaces/IResultData';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { ITableColumns } from '@shop/core/Interfaces/ITableColumns';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {


//**************************************************************************************************
//                                      Entrada de data                                                           
//**************************************************************************************************

@Input() query: DocumentNode = USERS_LIST_QUERY;
@Input() context: object;
@Input() itemsPerPage = 20;
@Input() include = true;
@Input() resultData: IResultData;
@Input() tableColumns: Array<ITableColumns> = undefined;
// ACTIVE, INACTIVE, ALL
@Input() filterActiveValue = 'ACTIVE' // Por defecto va a ser ACTIVE y por html-ngModel le asigno el valor que yo quiera

//**************************************************************************************************
//                                     Salida de data                                                           
//**************************************************************************************************

@Output() manageItem = new EventEmitter<Array<any>>();

//**************************************************************************************************
//                                       Variables                                                           
//**************************************************************************************************

infoPage: IInfoPage;
data$: Observable<any>;





  constructor(private paginationService: TablePaginationService) { }

  ngOnInit(): void {
    if(this.query === undefined){
      throw new Error('Query is undifinied, please add one')
    }
    if(this.resultData === undefined){
      throw new Error('resultData is undifinied, please add one')
    }
    if(this.tableColumns === undefined){
      throw new Error('Columns are undifinied, please add ones')
    }
    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPerPage: this.itemsPerPage,
      total: 1
    }
    this.loadData();
  }

  //**************************************************************************************************
  //          Función para cargar la info                                                           
  //**************************************************************************************************
  
  loadData() {

    const variables = {
      page: this.infoPage.page,
      itemsPerPage: this.itemsPerPage,
      include: this.include,
      active: this.filterActiveValue
    }
    this.data$ = this.paginationService.getCollectionData(this.query, variables, {}).pipe(map(
      (result:any) => {
        const data = result[this.resultData.definitionKey];
        this.infoPage.pages = data.info.pages;
        this.infoPage.total = data.info.total;
        return data[this.resultData.listKey];
      })
    )
  }

  changePage() {
    this.loadData();
  }


  //**************************************************************************************************
  //     Mñetodo para manejar las acciones de los botones edit,info & block                                                           
  //**************************************************************************************************
  
  manageAction(action: string, data: any) {
    console.log(action, data);
    this.manageItem.emit([action, data]);
  }

}
