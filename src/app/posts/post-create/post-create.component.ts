import { AuthService } from "./../../auth/auth.service";
import { Subscription } from "rxjs";
import { Post } from "../../models/post.model";
import { PostsService } from "../../services/posts.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimeType } from "./mime-type.validator";

const modes = { Create: "create", Edit: "edit" };
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  private mode = modes.Create;
  private postId: string;
  private loading = true;
  private authStatusSub: Subscription;
  imagePreview: string;
  form: FormGroup;
  post: Post;

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.loading = false;
      });
    // Create reactive form
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    this.route.paramMap.subscribe((p: ParamMap) => {
      if (p.has("postId")) {
        this.mode = modes.Edit;
        this.postId = p.get("postId");
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator,
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath,
          });
          this.imagePreview = this.post.imagePath as string;
        });
      } else {
        this.mode = modes.Create;
        this.postId = null;
      }
      this.loading = false;
    });
  }

  onAddPost() {
    this.loading = true;
    if (this.mode === modes.Create) {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
