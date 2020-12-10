import { Component, OnInit } from '@angular/core';
import { GENRE_LIST_QUERY } from '@graphql/operations/query/genre';
import { ITableColumns } from '@shop/core/Interfaces/table-columns.iterface';
import { DocumentNode } from 'graphql';
import { formBasicDialog, optionsWithDetails } from 'src/app/@shared/alerts/alerts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { GenresService } from 'src/app/services/genres.service';
import { IResultData } from '../../../@public/core/Interfaces/result-data-interface';
import { basicAlert } from '../../../@shared/alerts/toasts';

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

  constructor(private genreService: GenresService) { }

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


  //**************************************************************************************************
  //         Contiene las acción genérica que tiene que desarrollarse al hacer click en alguno de
  //           los botones implementados en el table-pagination                                                 
  //**************************************************************************************************
    
  async buttonsEdit($event) {
    console.log($event);

    // Coger la información para las acciones por separado
    const action = $event[0];
    const genre = $event[1];

    // Cogemos el valor por defecto
    const defaultValue = genre.name !== undefined && genre.name !== '' ? genre.name : '';
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;

    switch (action) {
      case 'add':
        // Añadir el item
        this.addForm(html);
        break;
      case 'edit':
        this.updateForm(html, genre);
        break;
      case 'info':
        const result = await optionsWithDetails(
          'Detalles',
          `${genre.name} (${genre.slug})`,
          375,
          '<i class="fas fa-edit"></i> Editar', // true
          '<i class="fas fa-lock"></i> Bloquear'
        ); // false
        if (result) {
          this.updateForm(html, genre);
        } else if (result === false) {
          // this.blockForm(genre);
        }
        break;
      case 'block':
        // this.blockForm(genre);
        break;
      default:
        break;
    }
  }


//**************************************************************************************************
//                        Métodos para añadir un género                                                           
//**************************************************************************************************
                
  private async addForm(html: string) {
    const result = await formBasicDialog('Añadir género', html, 'name');
    console.log(result);
    this.addGenre(result);
  }

  private addGenre(result) {
    if (result.value) {
      this.genreService.add(result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
          basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  //**************************************************************************************************
  //                    Métodos para actualizar género                                                           
  //**************************************************************************************************
  
  private async updateForm(html: string, genre: any) {
    const result = await formBasicDialog('Modificar género', html, 'name');
    console.log(result);
    this.updateGenre(genre.id, result);
  }

  private updateGenre(id: string, result) {
    console.log(id, result.value);
    if (result.value) {
      this.genreService.update(id, result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }


}
