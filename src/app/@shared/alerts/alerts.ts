import Swal from 'sweetalert2';



//**************************************************************************************************
//                 Configuraciones de alertas genéricas                                                           
//**************************************************************************************************

const swalWithBasicOptions = (title: string, html: string) =>
  Swal.mixin({
    title,
    html,
    focusConfirm: false,
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
  });

export async function formBasicDialog(
    title: string,
    html: string,
    property: string
  ) {
    return await swalWithBasicOptions(title, html).fire({
      preConfirm: () => {
        const value = (document.getElementById('name') as HTMLInputElement).value;
        if (value) {
          return value;
        }
        Swal.showValidationMessage(
          'Tienes que añadir un género para poder almacenarlo'
        );
        return;
      },
    });
  }