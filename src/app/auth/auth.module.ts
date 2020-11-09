import { AuthRoutingModule } from "./auth-routing.module";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "./../angular-material.module";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
