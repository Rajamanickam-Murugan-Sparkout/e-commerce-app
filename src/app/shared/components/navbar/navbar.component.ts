import { Component, Input } from '@angular/core';
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
export class NavbarComponent {

  @Input() getAddToCartProducts: any[] = [];

  
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ){    
  }
  public userName = this.localStorage.userLocalStorageGet('user').name;
  public userEmail = this.localStorage.userLocalStorageGet('user').email;
  
  logOut(){
    this.localStorage.userLoggedOut();
    this.router.navigate(['/login']);
  }
}
