import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlogRoutingModule } from './blog-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class BlogModule { }
