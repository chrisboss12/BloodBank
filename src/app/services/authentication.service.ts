import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any;
  authState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(
    private ngFireAuth: AngularFireAuth
  ) { 
    /*
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }
    })
    */
  }

  // Login with email and password
  signIn(value){
    return new Promise<any>((resolve, reject) => {
      this.ngFireAuth.signInWithEmailAndPassword(value.email, value.password)
      .then(
        result => resolve(result),
        error => reject(error)
      )
    })
  }

  // Register the user 
  register(value){
    return new Promise<any>((resolve, reject) => {
      this.ngFireAuth.createUserWithEmailAndPassword(value.email, value.password)
      .then(
        result => resolve(result),
        error => reject(error)
      )
    })
  }

  // Sign out the user
  signOut(){
    return new Promise<void>((resolve, reject) => {
      if(this.ngFireAuth.currentUser){
        this.ngFireAuth.signOut()
        .then(() => {
          console.log("Sign Out");
          resolve();
        })
        .catch(() => {
          reject();
        })
      }
    })
  }

  // User details
  userDetails(){
    return this.ngFireAuth.user;
  }

  // Get user details from Firebase for authentication purposes
  isAuthenticated(){
    return this.authState.value;
  }
}
