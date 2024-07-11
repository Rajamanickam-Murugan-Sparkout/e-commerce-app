import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterPipe implements PipeTransform {
    
    transform(products: any[], filteredValue: string): any {
        if (!products || !filteredValue) {
            return products;
        }else{
            filteredValue = filteredValue;

            const filteredProduct = products.filter(product => product.price < filteredValue);

            // console.log('filtered object',filteredProducts);
            if(filteredProduct.length !== 0){
                return filteredProduct;
            }else{
                return [];
            }
        }
    }

}
