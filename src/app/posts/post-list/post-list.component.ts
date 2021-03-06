import { AuthService } from "./../../auth/auth.service";
import { PostsService } from "./../../services/posts.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "src/app/models/post.model";
import { PageEvent } from "@angular/material";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  private postsChangedSubscription: Subscription;
  private authStatusSubscription: Subscription;
  userId: string;
  userIsAuthenticated = false;
  posts: Post[] = [];
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  loading = true;

  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserID();
    this.postsChangedSubscription = this.postsService
      .getPostUpdateListener()
      .subscribe((postdata: { posts: Post[]; postCount: number }) => {
        this.loading = false;
        this.totalPosts = postdata.postCount;
        this.posts = postdata.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserID();
      });
  }
  ngOnDestroy() {
    this.postsChangedSubscription.unsubscribe();
    this.authStatusSubscription.unsubscribe();
  }

  onDelete(postId) {
    this.loading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      if (this.currentPage > 1 && this.posts.length === 1) {
        this.onChangedPage({
          pageIndex: this.currentPage - 2,
          pageSize: this.postsPerPage,
          length: this.posts.length,
        });
      } else {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      }
    });
    this.loading = false;
  }

  onChangedPage(pageData: PageEvent) {
    this.loading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}
