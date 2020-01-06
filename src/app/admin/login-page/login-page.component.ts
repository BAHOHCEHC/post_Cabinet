import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../../shared/interfaces";
import { AuthService } from "../shared/services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submited: boolean;
  msg: string;
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params["loginAgainKey"]) {
        this.msg = "please enter your name";
      } else if (params["authFailedkey"]) {
        this.msg = "Please login again";
      }
      setTimeout(() => {
        this.msg = "";
      }, 2000);
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }
  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submited = true;
    const user: User = {
      returnSecureToken: false,
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.login(user).subscribe(
      res => {
        this.form.reset();
        this.router.navigate(["/admin", "dashboard"]);
        this.submited = false;
      },
      () => {
        this.submited = false;
      }
    );
  }
}
