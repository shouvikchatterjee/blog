import { Component, OnInit } from '@angular/core';

import { GlobalService } from 'src/app/core/services/global.service';
import { DataResolverService } from '../../services/data-resolver.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  postsData;
  userData;

  constructor(
    private globalService: GlobalService,
    private dataResolverService: DataResolverService
  ) { }

  ngOnInit(): void {
    this.getPostData();
  }

  /**
   * Fetch User Posts
   */
  getPostData() {
    this.dataResolverService.fetchPosts().subscribe(
      res => {
        this.postsData = res[0];
        this.userData = res[1];
      },
      err => {
        console.log(err);
      });
  }

  /**
   * Add New Post
   */
  addNewPost() {
    this.postsData.unshift({ title: '', body: '', new: true });
  }

  /**
   * Delete Post
   */
  deletePost(e) {
    this.postsData = this.postsData.filter(post => post.id !== e);
    this.dataResolverService.deletePost(e).subscribe(
      _ => {
        // 
      },
      err => {
        console.log(err);
      });
  }

  /**
   * Save Post
   */
  savePost(e) {
    if (e.new) {
      const userId = this.globalService.getUserInfo().id;

      let payLoad = {
        userId: userId,
        title: e.title,
        body: e.body,
      };

      this.dataResolverService.addPost(payLoad).subscribe(
        _ => {
          console.log('post added');
        },
        err => {
          console.log(err);
        });
    } else {
      this.dataResolverService.updatePost(e).subscribe(
        _ => {
          console.log('post updated');
        },
        err => {
          console.log(err);
        });
    }
  }
}
