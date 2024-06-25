import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    standalone: true
})
export class SearchPipe implements PipeTransform {

    transform(products: any[], filteredString: string): any[] {
        if (!products || !filteredString) {
            return products;
        }
        
        filteredString = filteredString.toLowerCase();
        
        return products.filter(product =>
            product.title.toLowerCase().includes(filteredString)
        );
    }

}
