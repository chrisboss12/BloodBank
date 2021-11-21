import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.required
      ])),
    }, 
    /*
    {
      validators: this.password.bind(this)
    }
    */
    );
  }

  /**
   * Get the password values in the formGroup
   * Returns true if password matches the re-entered password field
   */
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  /**
   * Get the sign up method from authentication service
   * If sign up is successful -> message pop up the confirmation of registration
   * If sign up is not successful -> messsage pop up that registration failed
   */
  signUp(value){
    this.authService.register(value)
    .then((response) => {
      this.errorMsg = "";
      this.successMsg = "Successful Register!";
    }), error => {
      this.errorMsg = error.message;
      this.successMsg = "";
    }
  }

  // Link that navigates ti the login page
  goToLogin(){
    this.router.navigateByUrl("login");
  }
}
