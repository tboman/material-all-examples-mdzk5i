import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        console.log(this.userDetails);
      } else {
        this.userDetails = null;
      }
    });
  }

  signInWithPopup() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    this._firebaseAuth
      .auth
      .signInWithPopup(provider)
      .then(function(result) {
        console.info('logged in');
        this.router.navigate(['/home']);
        console.info('forwarded to route');
      });
  }

  isLoggedIn() {
    console.info("user " + this.userDetails);
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  getUserdetails() {
    return this.userDetails;
  }

  logout() {
    this._firebaseAuth.auth.signOut().then(res => this.router.navigate(["/"]));
  }
}
