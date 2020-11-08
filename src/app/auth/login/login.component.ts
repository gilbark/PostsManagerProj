import { AuthService } from "./../auth.service";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loading = false;
  constructor(private authService: AuthService) {}
  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
}
