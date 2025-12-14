import { Component, HostListener, OnInit } from '@angular/core';
import { Blogs } from '../../core/models/blog.model';
import { BlogService } from '../../core/services/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBlog } from './components/create-blog/create-blog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  collapsed: boolean = false;
  isMobile: boolean = false;

  ngOnInit() {
    this.checkScreenSize(); 
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    this.collapsed = this.isMobile ? true : false; 
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed
  }

  onNavClick() {
    if(this.isMobile) {
      this.collapsed = true;
    }
  }
}
