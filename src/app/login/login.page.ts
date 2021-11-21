import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';

  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Provide email.' 
      },
      { 
        type: 'pattern', 
        message: 'Email is not valid.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Password is required.' 
      },
      { 
        type: 'minlength', 
        message: 'Password length should be 8 characters long.' 
      }
    ]
  };

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // Get the values from the login form and
    // validate the user input fields
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
    });
  }

  // Get the sign in method fron the authentication service
  // If sign is successful -> redirect the user to the dashboard LoginPage
  // If sign is not successful -> send an error message to the user
  signIn(value) {
    this.authService.signIn(value)
      .then((response) => {
        console.log(response)
        this.errorMsg = "";
        this.router.navigateByUrl('dashboard');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  // Redirects the user to the register page
  goToSignup() {
    this.router.navigateByUrl('register');
  }
}
