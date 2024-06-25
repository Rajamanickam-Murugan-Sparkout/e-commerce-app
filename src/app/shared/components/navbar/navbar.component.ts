import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() getAddToCartProducts: any[] = [];

  hideTotalPrice: boolean = false;
  
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ){    
  }

  ngOnInit() {
    if(this.getAddToCartProducts.length === 0){
      this.hideTotalPrice = !this.hideTotalPrice;
    }
  }

  public userName = this.localStorage.userLocalStorageGet('user').name;
  public userEmail = this.localStorage.userLocalStorageGet('user').email;

  decrementQuantity(i: any){
    this.getAddToCartProducts[i].quantity--;
  }

  incrementQuantity(i: any){
    this.getAddToCartProducts[i].quantity++;
  }

  removeItem(i: any){
    console.log(this.getAddToCartProducts[i]);    
    this.getAddToCartProducts[i].quantity ;
  }

  calculateProductTotalPrice() {
    let overallTotal = 0;
    for (let item of this.getAddToCartProducts) {
      let discountInDecimal = (item.discountPercentage/100)*item.price;
      let discountAmount = item.price - discountInDecimal;
      overallTotal += discountAmount;
    }
    return overallTotal;
  }
  
  logOut(){
    this.localStorage.userLoggedOut();
    this.router.navigate(['/login']);
  }
}
