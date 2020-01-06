import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Post } from "../../shared/interfaces";
import { PostService } from "../../shared/post.service";
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: "app-create-page",
  templateUrl: "./create-page.component.html",
  styleUrls: ["./create-page.component.scss"]
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  submited: boolean;
  constructor(
    private postService: PostService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required])
    });
  }
  submit() {
    if (this.form.invalid) {
      return;
    }
    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    };
    this.submited = true;
    this.postService.create(post).subscribe(() => {
      this.submited = false;
      this.alertService.success('Post was created')
      this.form.reset();
    });
  }
}
