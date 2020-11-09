import { Subscription } from "rxjs";
import { AuthService } from "./../auth.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit, OnDestroy {
  loading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.loading = false;
      });
  }

  onSignup(form: NgForm) {
    this.loading = true;
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
