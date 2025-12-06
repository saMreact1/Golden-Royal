import { Component, OnInit } from '@angular/core';
import { Blogs } from '../../core/models/blog.model';
import { BlogService } from '../../core/services/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBlog } from './components/create-blog/create-blog';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  blogs: any[] = [];

  constructor(
    private blog: BlogService,
    private dialog: MatDialog
  ) {};

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blog.getAllBlogs().subscribe(res => {
      this.blogs = res.content;
    });
  }

  openDialog() {
    this.dialog.open(CreateBlog, {
      // width: '100%',
      maxHeight:' 80vh',
      panelClass: 'create-blog-dialog'
    })
  }
}
