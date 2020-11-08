import { AuthService } from "./../auth.service";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loading = false;
  constructor(private authService: AuthService, private router: Router) {}
  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
    this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate([""]);
      }
    });
  }
}
