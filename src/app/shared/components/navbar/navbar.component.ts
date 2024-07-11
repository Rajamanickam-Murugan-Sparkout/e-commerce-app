import { AfterContentChecked, AfterViewChecked, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class NavbarComponent implements AfterContentChecked {

  @Input() getAddToCartProducts: any[] = [];

  hideTotalPrice: boolean = false;
  hideEmptyImage: boolean = true;
  
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ){    
  }

  ngAfterContentChecked() {
    console.log('ng after content checked', this.getAddToCartProducts.length);
    if(this.getAddToCartProducts.length !== 0){
      this.hideTotalPrice = true;
      this.hideEmptyImage = false;
    }
  }

  public userName = this.localStorage.userLocalStorageGet('user').name;
  public userEmail = this.localStorage.userLocalStorageGet('user').email;

  /**
   * When clicking a decrement button, decrease the value of a particular product based on its index.
   * @param i 
   */
  decrementQuantity(i: any){
    this.getAddToCartProducts[i].quantity--;
  }

  /**
   * When clicking a increment button, increase the value of a particular product based on its index.
   * @param i 
   */
  incrementQuantity(i: any){
    this.getAddToCartProducts[i].quantity++;
  }

  /**
   * When clicking a delete icon button, delete the specific cart product based on its index.
   * @param i 
   */
  removeItem(i: any){
    console.log(this.getAddToCartProducts);
    console.log('remove item', this.getAddToCartProducts.splice(i,1));

  }

  calculateProductsTotalPrice(){
    let productsTotal = 0;
    for (let item of this.getAddToCartProducts) {
      productsTotal += item.price * item.quantity;
    }
    return productsTotal;
  }

  calculateDiscountAmount(){
    let discountedPrice = 0;
    for (let item of this.getAddToCartProducts) {
      discountedPrice += (item.discountPercentage/100)*item.price * item.quantity;
    }
    return discountedPrice;
  }

  /**
   * Calculate the total price of all cart products, including a discount percentage.
   * @returns  
   */
  calculateProductsTotalPriceIncludeOffer() {
    let overallTotal = 0;
    for (let item of this.getAddToCartProducts) {
      let discountAmount = (item.discountPercentage/100)*item.price;
      let discountedPrice = item.price * item.quantity - discountAmount;
      overallTotal += discountedPrice * item.quantity;
      console.log(discountAmount, discountedPrice);
    }
    return overallTotal;
  }
  
  /**
   * When the user logs out, clear the local storage data and redirect to the login page.
   */
  logOut(){
    this.localStorage.userLoggedOut();
    this.router.navigate(['/login']);
  }
}
