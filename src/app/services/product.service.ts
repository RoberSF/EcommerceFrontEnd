import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { PRODUCT_LAST_UNITS_OFFERS_QUERY, PRODUCT_BY_PLATFORM_QUERY } from '@graphql/operations/query/product';
import { ACTIVE_FILTERS } from '../@shared/constants/filter';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}

getByPlatform(page: number = 1, itemsPage: number = 10, active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE, 
                platform: string, random: Boolean = false, showInfo: boolean = false) {
                
    return this.get(PRODUCT_BY_PLATFORM_QUERY,{page, itemsPage, active, platform,random, showInfo }).pipe(map( (result: any) => {
        const data =  result.productsPlatformsRandom
        return {
          info: data.info,
          result: this.manageInfo(data.products)
        }
        
      }));
}


getByLastUnitsOffers(page: number = 1, itemsPage: number = 10, active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE, 
                        random: Boolean = false, topPrice: number = -1, lastUnits: number = -1, showInfo: boolean = false) {

    return this.get(PRODUCT_LAST_UNITS_OFFERS_QUERY,{page, itemsPage, active, random, topPrice, lastUnits, showInfo}).pipe(map( (result: any) => {
      const data =  result.productsOffersLast;
        return {
          info: data.info,
          result: this.manageInfo(data.products)
        } 
      }));
}



private manageInfo(listProducts) {
        const resultList: Array<IProduct> = [];
        listProducts.map( (productObject) => {
          resultList.push(
            {
            // Tener en cuenta la interfaceIProduct
            id: productObject.id,
            name: productObject.product.name,
            img: productObject.product.img,
            stock: productObject.stock,
            price: productObject.price,
            description: '',
            qty: 1,
            rating: productObject.product.rating,
            
            }
          )
        })
        // console.log(resultList);
        return resultList;
}


}
