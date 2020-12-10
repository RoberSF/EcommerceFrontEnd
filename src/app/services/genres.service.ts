import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { ADD_GENRE } from '@graphql/operations/mutation/genre';

@Injectable({
  providedIn: 'root'
})
export class GenresService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}


add(genre: string) {
  return this.set(ADD_GENRE,{genre}, {}).pipe(map( (result: any) => {
      return result.addGenre;
    }));
}


}
