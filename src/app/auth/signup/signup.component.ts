import { AuthService } from "./../auth.service";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent {
  loading = false;
  constructor(public authService: AuthService) {}
  onSignup(form: NgForm) {
    this.loading = true;
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }
}
