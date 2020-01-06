import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "src/app/shared/post.service";
import { Post } from "src/app/shared/interfaces";
import { Subscription } from "rxjs";
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"]
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  constructor(
    private postService: PostService,
    private alertService: AlertService
  ) {}
  $asub: Subscription;
  $delsub: Subscription;
  searchStr: string = "";

  ngOnDestroy(): void {
    if (this.$asub) {
      this.$asub.unsubscribe();
    }
    if (this.$delsub) {
      this.$delsub.unsubscribe();
    }
  }
  ngOnInit() {
    this.$asub = this.postService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }
  remove(postId: string) {
    this.$delsub = this.postService.removePost(postId).subscribe(posts => {
      this.alertService.danger("Post was deleted");
      this.posts = this.posts.filter(post => post.id !== postId);
    });
  }
}
