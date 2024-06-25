import { Component } from '@angular/core';
import { CommonModule, JsonPipe, KeyValuePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isProcessing: boolean = false;
  showPassword: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToasterService,
    private localStorage: LocalStorageService
  ){}

  loginForm = new FormGroup({
    'email': new FormControl('',[Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
  });

  onLoginFormSubmitted(){
    this.authService.loginUser().subscribe({
      next: (res: any)=>{
        const user: any = res.find((findUser: any)=>{
          return findUser.email === this.loginForm.value.email && findUser.password === this.loginForm.value.password;
        });
        if(user){
          console.log(user);
          this.localStorage.userLocalStorageSet(user);
          this.loginForm.reset();
          this.router.navigate(['/home']);
        }else{
          this.toaster.showError();
        }
      },
      error: (err: any)=>{
        alert('Something went wrong!')
        this.toaster.showError()
      }
    })
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('hs-toggle-login-password') as HTMLInputElement;
    if (this.showPassword) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

}
