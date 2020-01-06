import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "src/app/shared/post.service";
import { ActivatedRoute } from "@angular/router";
import { Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Post } from "src/app/shared/interfaces";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AlertService } from './../shared/services/alert.service';

@Component({
  selector: "app-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.scss"]
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submited: boolean;
  post: Post;
  $updatesub: Subscription;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postService.getById(params["id"]);
        })
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        });
      });
  }
  submit() {
    if (this.form.invalid) {
      return;
    }
    this.post = {
      id: this.post.id,
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.post.author,
      date: this.post.date
    };
    this.submited = true;

    this.$updatesub = this.postService.update(this.post).subscribe(post => {
      this.alertService.success("Post was updated");
      this.submited = false;
    });
  }

  ngOnDestroy(): void {
    if (this.$updatesub) {
      this.$updatesub.unsubscribe();
    }
  }
}
