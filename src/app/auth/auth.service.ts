import { AuthData } from "./auth-data.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  getIsAuth() {
    return this.isAuthenticated;
  }
  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };

    this.http
      .post<{ token: string }>("http://localhost:3000/api/user/login", authData)
      .subscribe((response) => {
        this.token = response.token;
        if (this.token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
  }
}
