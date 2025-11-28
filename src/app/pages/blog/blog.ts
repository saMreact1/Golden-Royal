import { BlogService } from '../../core/services/blog.service';
import { Blogs } from './../../core/models/blog.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements OnInit {
  blogs: any[] = [];
  totalPages = 0

  selectedBlog: any | null = null;
date: any;

  constructor(
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getAllBlogs().subscribe(res => {
      this.blogs = res.content;
      this.totalPages = res.totalPages;

      if (this.blogs.length > 0) {
        this.selectedBlog = this.blogs[0];
      }
    });
  }

  selectBlog(blog: Blogs) {
    this.selectedBlog = blog;
  }
}