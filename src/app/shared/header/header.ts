import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UtilsService } from '../../core/services/utils.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  mobileMenuOpen: boolean = false;
  activeSection: string = 'hero';

  constructor(
    private router: Router,
    private utils: UtilsService
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;

        if (url.startsWith('/blog')) {
          this.activeSection = 'blog';
          return
        }

        setTimeout(() => {
          this.observeSections();
        }, 0);
      }
    });
  }

  observeSections() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, {
      threshold: 0.35,
    });

    sections.forEach(sec => observer.observe(sec));
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  scrollTo(target: string) {
    this.utils.scrollTo(target);
    this.mobileMenuOpen = false;
    this.activeSection = target;
  }

  navigateToSection(section: string) {
    if (this.router.url === '/' || this.router.url === '/home') {
      this.scrollTo(section);
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollTo(section);
        }, 50);
      });
    }
  }
}
