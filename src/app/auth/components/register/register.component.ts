import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/common-interface';
// import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showConfirmPassword: any;
  showPassword: any;
  isProcessing: boolean = false;

  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router
  ){

  }

  registerForm = new FormGroup({
    'name': new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(20)]),
    'email': new FormControl('',[Validators.required]),
    'password': new FormControl('', [Validators.required ]),
    'confirmPassword': new FormControl('', [Validators.required])
  }
);

/**
 * The registration form submitted sends form data to the server, redirects to the login page, and displays a toaster message.
 */
public registerFormSubmitted(){ 
  const postUserDetails = { ...this.registerForm.value }
  delete postUserDetails.confirmPassword;
  // console.log(postUserDetails);
  this.authService.registerUser(postUserDetails as User).subscribe({
    next: (res)=>{
      console.log(res);
      this.toaster.success("User signup successfully!")
      this.router.navigate(["login"])
    },
    error: (err)=>{
      console.log(err);  
      this.toaster.error("Something went wrong!")
    }
  })
}

/**
 * Toggles password visibility hide and show
 */
togglePasswordVisibility(){
  this.showPassword = !this.showPassword;
  const passwordInput = document.getElementById('hs-toggle-password') as HTMLInputElement;
  if (this.showPassword) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

/**
 * Toggles confirm password visibility hide and show
 */
toggleConfirmPasswordVisibility(){
  this.showConfirmPassword = !this.showConfirmPassword;
  const confirmPasswordInput = document.getElementById('hs-toggle-confirm-password') as HTMLInputElement;
  if (this.showConfirmPassword) {
    confirmPasswordInput.type = 'text';
  } else {
    confirmPasswordInput.type = 'password';
  }
}

}
