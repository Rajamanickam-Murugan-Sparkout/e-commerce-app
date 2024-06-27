import { Component } from '@angular/core';
import { CommonModule, JsonPipe, KeyValuePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ToastrService , ToastNoAnimation } from 'ngx-toastr';
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
    private toaster: ToastrService,
    private localStorage: LocalStorageService
  ){}

  loginForm = new FormGroup({
    'email': new FormControl('',[Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
  });

  /**
  * The login form submitted to check the user to exist in the server if the user exist to redirect home page and displays a toaster message.
  * User details to be stored in the local storage to check if the user is authenticated
  */
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
          this.toaster.success("User logged in successfully!")
          this.router.navigate(['/home']);
        }else{
          this.toaster.error("something went wrong");
        }
      },
      error: (err: any)=>{
        this.toaster.error("something went wrong")
      }
    })
  }

  /**
   * Toggles password visibility hide and show
   */
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
