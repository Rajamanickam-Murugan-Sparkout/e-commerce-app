import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  clear() {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  userLocalStorageSet(userLocalData: any){
    localStorage.setItem('user', JSON.stringify(userLocalData))
  }

  userLocalStorageGet(key: string){
    return JSON.parse(localStorage.getItem(key) || '{}')
  }

  getUserAuthToken(key: string){
    return JSON.parse(localStorage.getItem(key) || '{}')
  }

  userLoggedOut(){
    return localStorage.clear();
  }
}
