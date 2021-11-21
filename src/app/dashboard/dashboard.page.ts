import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userDetails: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  /**
   * Checks if the user is logged in
   * If not logged in, the user will be redirected to the '' page
   * from app-routing.module.ts which is the default route path
   */
  ngOnInit() {
    this.authService.userDetails().subscribe(response => {
      if (response !== null) {
        this.userDetails = response.email;
      } else {
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    })
  }

  // Calls the sign out method on the authentication service
  // and redirects the user to the login page.
  signOut() {
    this.authService.signOut()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      })
  }
}
