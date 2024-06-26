import { AfterViewChecked, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  hideEmptyImage: boolean = true;
  
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ){    
  }

  ngOnInit() {
    // console.log('oninit log',this.getAddToCartProducts.length);
    
    if(this.getAddToCartProducts.length === 0){
      this.hideTotalPrice = false;
      // console.log("quantity changes", this.getAddToCartProducts.length);
    }else if(this.getAddToCartProducts.length){
      console.log(this.hideEmptyImage, this.hideTotalPrice);
      this.hideTotalPrice = true;
      this.hideEmptyImage = false;
      // this.hideTotalPrice = true; 
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

  /**
   * Calculate the total price of all cart products, including a discount percentage.
   * @returns  
   */
  calculateProductTotalPrice() {
    let overallTotal = 0;
    for (let item of this.getAddToCartProducts) {
      let discountInDecimal = (item.discountPercentage/100)*item.price;
      let discountAmount = item.price - discountInDecimal;
      overallTotal += discountAmount;
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
