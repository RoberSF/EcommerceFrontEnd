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


  //**************************************************************************************************
  //                              Opciones con detalles                                                           
  //**************************************************************************************************
  
  export async function optionsWithDetails(
    title: string,
    html: string,
    width: number | string,
    confirmButtonText: string = '',
    cancelButtonText: string = ''
  ) {
    return await Swal.fire({
      title,
      html,
      width: `${width}px`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#6c757d',
      cancelButtonColor: '#dc3545',
      confirmButtonText,
      cancelButtonText,
    }).then((result) => {
      console.log(result);
      if (result.value) {
        console.log('Editar');
        return true;
      } else if (result.dismiss.toString() === 'cancel') {
        console.log('Bloquear');
        return false;
      }
    });
  }