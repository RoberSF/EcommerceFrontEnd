import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { PRODUCT_LAST_UNITS_OFFERS_QUERY, PRODUCT_BY_PLATFORM_QUERY } from '@graphql/operations/query/product';
import { ACTIVE_FILTERS } from '../@shared/constants/filter';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}

getByPlatform(page: number = 1, itemsPerPage: number = 10, active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE, 
    random: Boolean = false, platform: string) {
    return this.get(PRODUCT_BY_PLATFORM_QUERY,{page, itemsPerPage, active, random, platform}).pipe(map( (result: any) => {
        return result.productsPlatformsRandom;
      }));
}


getByLastUnitsOffers(page: number = 1, itemsPerPage: number = 10, active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE, 
                        random: Boolean = false, topPrice: number = -1, lastUnits: number = -1) {

    console.log('Last Units working');
    return this.get(PRODUCT_LAST_UNITS_OFFERS_QUERY,{page, itemsPerPage, active, random, topPrice, lastUnits}).pipe(map( (result: any) => {
        return result.productsOffersLast;
      }));
}



}
