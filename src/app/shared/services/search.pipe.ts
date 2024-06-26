import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    standalone: true
})
export class SearchPipe implements PipeTransform {

    transform(products: any[], filteredString: string): any {
        if (!products || !filteredString) {
            return products;
        }else{
            filteredString = filteredString.toLowerCase();

            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(filteredString)
            );
            // console.log('filtered object',filteredProducts);
            if(filteredProducts.length !== 0){
                return filteredProducts;
            }else{
                return [];
            }
        }
    }

}
