import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  // standalone: true,
  // imports: [],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signInForm: FormGroup;
  email: string = '';
  password: string = '';  
  constructor(private router: Router, private sf:FormBuilder) { 
    this.signInForm=this.sf.group({
      email:['',Validators.required],
      password : ['',Validators.required]
    })
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  // navigateToHome() {
  //   this.router.navigate(['/dashboard']);
  // }
  navigateToHome() {
    if(this.signInForm.valid){
      console.log(this.signInForm.value);
    }
    else {
      // Mark all controls as touched to show validation messages
      this.signInForm.markAllAsTouched();
    }
    if (this.email && this.password) {
      if (this.email.trim() === 'adil' && this.password.trim() === '123') {
        localStorage.setItem('isAuthenticated', 'true');
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('Please enter email and password');
    }
  }
}
