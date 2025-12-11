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

  imageUrl: string | null = null;

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
      const first = this.blogs[0];

      this.blogService.viewBlog(first.id).subscribe(updated => {
        const idx = this.blogs.findIndex(b => b.id === updated.id);
        if (idx !== -1) this.blogs[idx] = updated;

        this.selectedBlog = updated;
        this.imageUrl = updated.featuredImage;
      });
    }
  });
}


  selectBlog(blog: Blogs) {
    this.blogService.viewBlog(blog.id).subscribe(updatedBlog => {
      this.selectedBlog = updatedBlog;

      const idx = this.blogs.findIndex(b => b.id === blog.id);
      if (idx !== -1) {
        this.blogs[idx] = updatedBlog;
      }
    })
  }
}