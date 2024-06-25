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

  mostPopular(){
    this.products.sort((first,second)=>{
      return second.rating - first.rating;
    })
  }

  highToLow(){
    this.products.sort((firstPrice,secondPrice)=>{
      return secondPrice.price - firstPrice.price;
    })   
  }

  lowToHigh(){
    this.products.sort((firstPrice,secondPrice)=>{
      return firstPrice.price - secondPrice.price ;
    })   
  }

  discount(){
    this.products.sort((first,second)=>{
      return second.discountPercentage - first.discountPercentage;
    })
  }

}
