import gql from 'graphql-tag';
import { GENRE_FRAGMENT } from '../fragment/genre';


//**************************************************************************************************
//                    Método de añadir género de la api graphql                                                           
//**************************************************************************************************

export const ADD_GENRE = gql`

mutation addGenre($genre: String!) {
    addGenre(genre: $genre) {
      status
      message
      genre {
        ...GenreObject
      }
    }
  }
  ${GENRE_FRAGMENT}
  `;
