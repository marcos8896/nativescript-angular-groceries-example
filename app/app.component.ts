import { Component } from "@angular/core";
import { User } from './shared/user/user';
import { UserService } from "./shared/user/user.service";

@Component({
  selector: "my-app",
  providers: [ UserService ],
  templateUrl: 'pages/login/login.html',
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class AppComponent {
  
  public user: User;
  public isLoggingIn = true;

  constructor( private userService: UserService ) {
    this.user = new User();
    this.user.email = 'apokono@karnal.com';
    this.user.password = 'qwerty1234';
  }

  public submit() {
    if ( this.isLoggingIn )
      this.login();
    else
      this.signUp();

  }

  public login() {
    //PORHACERMEN == TODO 
  }

  signUp() {
    this.userService.register( this.user )
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        () => alert("Unfortunately we were unable to create your account.")
      );
  }

  public toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}