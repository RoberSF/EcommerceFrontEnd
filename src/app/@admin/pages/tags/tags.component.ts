import { Component, OnInit } from '@angular/core';
import { IResultData } from '@shop/core/Interfaces/IResultData';
import { ITableColumns } from '@shop/core/Interfaces/ITableColumns';
import { DocumentNode } from 'graphql';
import { formBasicDialog, optionsWithDetails } from 'src/app/@shared/alerts/alerts';
import { basicAlert } from 'src/app/@shared/alerts/toasts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';
import { TitleService } from '@admin/core/services/titleService.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  query: DocumentNode
  context: object;
  itemsPerPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>
  
  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.updateTitle('Tags')
    this.context = {};
    this.itemsPerPage = 10;
    this.resultData = {
      listKey: 'tags',
      definitionKey: 'tags'
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

  async buttonsEdit($event) {

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
          this.blockForm(genre);
        }
        break;
      case 'block':
        this.blockForm(genre);
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
    this.addGenre(result);
  }

  private addGenre(result) {
    // if (result.value) {
    //   this.genreService.add(result.value).subscribe((res: any) => {
    //     if (res.status) {
    //       basicAlert(TYPE_ALERT.SUCCESS, res.message);
    //       return;
    //     }
    //       basicAlert(TYPE_ALERT.WARNING, res.message);
    //   });
    // }
  }

  //**************************************************************************************************
  //                    Métodos para actualizar género                                                           
  //**************************************************************************************************
  
  private async updateForm(html: string, genre: any) {
    const result = await formBasicDialog('Modificar género', html, 'name');
    this.updateGenre(genre.id, result);
  }

  private updateGenre(id: string, result) {
    // if (result.value) {
    //   this.genreService.update(id, result.value).subscribe((res: any) => {
    //     console.log(res);
    //     if (res.status) {
    //       basicAlert(TYPE_ALERT.SUCCESS, res.message);
    //       return;
    //     }
    //     basicAlert(TYPE_ALERT.WARNING, res.message);
    //   });
    // }
  }

  //**************************************************************************************************
  //              Método para bloquear un género                                                           
  //**************************************************************************************************
  

  private blockGenre(id: string) {
    // this.genreService.block(id).subscribe((res: any) => {
    //   if (res.status) {
    //     basicAlert(TYPE_ALERT.SUCCESS, res.message);
    //     return;
    //   }
    //   basicAlert(TYPE_ALERT.WARNING, res.message);
    // });
  }

  private async blockForm(genre: any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      `Si bloqueas el item seleccionado, no se mostrará en la lista`,
      430,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) {
      // Si resultado falso, queremos bloquear
      this.blockGenre(genre.id);
    }
  }

}