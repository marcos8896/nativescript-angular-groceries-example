import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { User } from '../../shared/user/user';
import { UserService } from "../../shared/user/user.service";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

@Component({
  selector: "my-app",
  providers: [ UserService ],
  templateUrl: 'pages/login/login.html',
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})

export class LoginComponent implements OnInit {
  
  public user: User;
  public isLoggingIn = true;
  @ViewChild("container") container: ElementRef;

  constructor( private userService: UserService, private router: Router,
               private page: Page
               ) {
    this.user = new User();
    this.user.email = 'apokono@karnal.com';
    this.user.password = 'qwerty1234';
  }

  ngOnInit() {
    console.log("ngOnInit login");
    this.page.actionBarHidden = true;
    this.page.backgroundImage = "res://bg_login";
  }

  public submit() {
    if ( this.isLoggingIn )
      this.login();
    else
      this.signUp();

  }

  public login() {
    this.userService.login(this.user)
      .subscribe(
        () => this.router.navigate(["/list"]),
        (error) => alert("Unfortunately we could not find your account.")
      );
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
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color('White') : new Color('#FFE0E5'),
      duration: 200
    })
  }
}