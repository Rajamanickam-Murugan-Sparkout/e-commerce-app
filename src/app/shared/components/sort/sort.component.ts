import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from 'src/app/constants/data';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent {
  constructor(
  ){}

  public products = Products;

  /**
   * Use the sort method to arrange the most popular products based on higher ratings to lower ratings.
   */
  mostPopular(){
    this.products.sort((first,second)=>{
      return second.rating - first.rating;
    })
  }

  /**
   * Use the sort method to arrange the products based on higher price to lower price.
   */
  highToLow(){
    this.products.sort((firstPrice,secondPrice)=>{
      return secondPrice.price - firstPrice.price;
    })   
  }

  /**
   * Use the sort method to arrange the products based on lower price to higher price.
   */
  lowToHigh(){
    this.products.sort((firstPrice,secondPrice)=>{
      return firstPrice.price - secondPrice.price ;
    })   
  }

  /**
   * Use the sort method to arrange the products based on higher discount to lower discount.
   */
  discount(){
    this.products.sort((first,second)=>{
      return second.discountPercentage - first.discountPercentage;
    })
  }

}
