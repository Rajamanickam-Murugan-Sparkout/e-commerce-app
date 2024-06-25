import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/interfaces/common-interface';
import { ToasterService } from 'src/app/shared/services/toaster.service';

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
    private toaster: ToasterService,
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

public registerFormSubmitted(){ 
  const postUserDetails = { ...this.registerForm.value }
  delete postUserDetails.confirmPassword;
  // console.log(postUserDetails);
  this.authService.registerUser(postUserDetails as User).subscribe({
    next: (res)=>{
      console.log(res);
      // this.toaster.showSuccess()
      this.router.navigate(["login"])
    },
    error: (err)=>{
      console.log(err);  
      this.toaster.showError()
    }
  })
}

togglePasswordVisibility(){
  this.showPassword = !this.showPassword;
  const passwordInput = document.getElementById('hs-toggle-password') as HTMLInputElement;
  if (this.showPassword) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

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
