import { Component, OnInit } from '@angular/core';
import { Blogs } from '../../core/models/blog.model';
import { BlogService } from '../../core/services/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBlog } from './components/create-blog/create-blog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  blogs: any[] = [];
  loading: boolean = true;

  constructor(
    private blog: BlogService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {};

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blog.getAllBlogs().subscribe(res => {
      this.blogs = res.content;
      this.loading = false;
    });
  }

  deleteBlog(blogId: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '380px',
      panelClass: 'confirm-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;

        this.blog.deleteBlog(blogId).subscribe({
          next: () => {
            this.blogs = this.blogs.filter(blog => blog.id !== blogId);
            this.loading = false;
            this.snack.open('Blog deleted successfully ✅', 'Close', { duration: 3000 });
          },
          error: () => {
            this.loading = false;
            this.snack.open('Failed to delete blog ❌', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateBlog, {
      // width: '100%',
      maxHeight:' 80vh',
      panelClass: 'create-blog-dialog'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBlogs();
      }
    });
  }

  openEditDialog(blog: any) {
    const dialogRef = this.dialog.open(CreateBlog, {
      data: blog,
      panelClass: 'create-blog-dialog'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBlogs();
      }
    });
  }
}
