import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { COLLECTION_TOTALS } from '@graphql/operations/query/dashboard';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DashboardService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}



getStats(){ 
    return this.get(COLLECTION_TOTALS).pipe(map( (result:any) => {
      return  {
          users: result.users,
          platforms: result.platforms,
          tags: result.tags,
          genres: result.genres,
          shopProducts: result.shopProducts,
          products: result.products
      }
    }));
    };










}
