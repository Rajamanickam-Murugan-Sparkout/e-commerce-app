import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { Products } from 'src/app/constants/data';
import { SortComponent } from 'src/app/shared/components/sort/sort.component';
import { RangeFilterComponent } from 'src/app/shared/components/range-filter/range-filter.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { SearchPipe } from 'src/app/shared/services/search.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SortComponent, RangeFilterComponent, SearchComponent, SearchPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public addedCart: boolean = false;
  addToCartProducts: any[] = [];
  receiveData: string = '';


  constructor(
  ){
    console.log(this.products);
  }
  public products = Products;

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

  receiveDataFromChild(data: any){
    console.log('received data',data);
    this.receiveData = data;
  }
}
