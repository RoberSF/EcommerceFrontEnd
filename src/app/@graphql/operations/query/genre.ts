import gql from 'graphql-tag';
import { GENRE_FRAGMENT } from '../fragment/genre';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';

export const GENRE_LIST_QUERY = gql`

    query genres($page: Int!, $itemsPage: Int) {
      genres(page: $page, itemsPerPage: $itemsPage) {
        info {
          ...ResultInfoObject
        }
        status
        message
        genres {
          ...GenreObject
        }
      }
    }
    ${ RESULT_INFO_FRAGMENT }
    ${ GENRE_FRAGMENT }
`;