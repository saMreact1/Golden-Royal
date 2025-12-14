import { Component } from '@angular/core';
import { BlogService } from '../../../core/services/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { CreateBlog } from '../components/create-blog/create-blog';

@Component({
  selector: 'app-manage-blog',
  standalone: false,
  templateUrl: './manage-blog.html',
  styleUrl: './manage-blog.scss',
})
export class ManageBlog {
  blogs: any[] = [];
  loading: boolean = true;
  page = 0;
  size = 10;
  totalPages = 0;

  filters = {
    status: '',
    category: '',
    search: ''
  };

  selectedStatus: string | null = null;
  selectedCategory: string | null = null;
  searchText: string = '';

  constructor(
    private blog: BlogService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {};

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    const { status, category, search } = this.filters;

    let request$: Observable<any>;

    if (search) {
      request$ = this.blog.search(search, this.page, this.size);
    } else if (status) {
      request$ = this.blog.filterByStatus(status, this.page, this.size);
    } else if (category) {
      request$ = this.blog.filterByCategory(category, this.page, this.size);
    } else {
      request$ = this.blog.getAllBlogs(this.page, this.size);
    }

    request$.subscribe(res => {
      this.blogs = res.content;
      this.totalPages = res.totalPages;
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

  debouncedSearch = this.debounce(() => {
    this.page = 0;
    this.loadBlogs();
  }, 500);

  debounce(func: Function, delay: number) {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadBlogs();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadBlogs();
    }
  }
}
