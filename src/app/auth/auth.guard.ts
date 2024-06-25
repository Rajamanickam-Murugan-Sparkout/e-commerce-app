import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(
    private localStorageService: LocalStorageService,
    private router: Router
) {}

canActivate(): boolean {
    const token = this.localStorageService.userLocalStorageGet('user');
    // console.log("auth user",token.email);
    
    if (this.localStorageService.userLocalStorageGet('user')?.email as string) {
        return true;
    } else {
        this.router.navigate(['/login']);
        return false;
    }
    }
}
