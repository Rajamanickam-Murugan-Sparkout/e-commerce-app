import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { Products } from 'src/app/constants/data';
import { SortComponent } from 'src/app/shared/components/sort/sort.component';
import { RangeFilterComponent } from 'src/app/shared/components/range-filter/range-filter.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { SearchPipe } from 'src/app/shared/services/search.pipe';
import { FilterPipe } from 'src/app/shared/services/range-filter.pipe';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SortComponent, RangeFilterComponent, SearchComponent, SearchPipe, FilterPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public addedCart: boolean = false;
  addToCartProducts: any[] = [];
  receiveData: string = '';
  filteredProducts: any = '';
  cloneProducts: any = [...Products]

  constructor(
  ){
    console.log(this.products);
  }
  public products = Products;
  public priceFilter: any = { min: 0, max: Number.MAX_SAFE_INTEGER }; // Default price range


  /**
   * Get the index of the clicked 'Add to Cart' button for each product and push the index value to a new array named addToCartProducts.
   * @param idx 
   */
  onAddCartProduct(idx: number){
    // this.addedCart = !this.addedCart;    
    // if(this.products.id)
    // const newArray = { ...this.addToCartProducts, isAdded: true}
    // this.addToCartProducts[idx].quantity++;
      this.products[idx].quantity++;
      this.addToCartProducts.push(this.products[idx]);
    // console.log(idx);
    // console.log("already exists", this.addToCartProducts);
    // if(this.addToCartProducts.indexOf(idx)){
    // }
    // console.log('add to cart product',this.addToCartProducts);
  }

  /**
   * Receives data from child search component 
   * @param data 
   */
  receiveDataFromChild(data: any){
    console.log('received data',data);
    this.receiveData = data;
  }

  private filteredProductsSubject = new BehaviorSubject<any[]>(this.cloneProducts);
  filteredProducts$: Observable<any[]> = this.filteredProductsSubject.asObservable();

  receiveRangeValue(data: any){

    const filteredProducts = this.cloneProducts.filter((product: { price: number }) => {
      return product.price <= data;
    });
    this.filteredProductsSubject.next(filteredProducts);
  
    // console.log('received range value', data);
    // this.filteredProducts = data;
    // console.log(this.products);
    
    // this.filteredProducts = this.cloneProducts.map((first:any)=>{
    //   console.log(first.price);
    // })
    // this.priceFilter = data; // Update price filter

    // Filter products based on the received price range
    // this.filteredProducts = this.products.filter((product: any) => {
    //   return product.price >= data.minPrice && product.price <= data.maxPrice;
    // });

    // this.filteredProducts = this.products.map((product: any) => {
    //   console.log(product.price < data);
    // });
  }

  productsList: any = [
    { name: 'Product 1', price: 50.00, quantity: 2 },
    { name: 'Product 2', price: 30.00, quantity: 1 },
    { name: 'Product 3', price: 20.00, quantity: 4 },
    { name: 'Product 4', price: 25.00, quantity: 2 }
  ];

  selectedProduct: any | null = null;

  toggleDetails(product: any): void {
    if (this.selectedProduct === product) {
      this.selectedProduct = null;
    } else {
      this.selectedProduct = product;
    }
  }

  isSelected(product: any): boolean {
    return this.selectedProduct === product;
  }
}
