import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  mobileMenuOpen: boolean = false;
  activeSection: string = 'hero';

  ngOnInit() {
    const sections = document.querySelectorAll('section[id');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.35,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, options);

    sections.forEach(sec => observer.observe(sec));
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  scrollTo(target: string) {
    document.getElementById(target)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    this.mobileMenuOpen = false;
    this.activeSection = target;
  }
}
