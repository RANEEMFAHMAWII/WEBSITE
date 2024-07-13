import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  lang: string;
  counter = 0;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private scroller: ViewportScroller
  ) {
    this.translate.onLangChange.subscribe((event) => {
      this.lang = event.lang;
    });
    this.lang = this.translate.currentLang || 'en'; // Default language if none set
  }

  ngOnInit(): void {
    this.changeNavDrawer();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeBtnGroupRadius();
      }
    });
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  scroll(nav: string): void {
    this.router.navigate(['/home']);
    setTimeout(() => {
      this.scroller.scrollToAnchor(nav);
    }, 100);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const element = document.querySelector('.inverse') as HTMLElement;
    if (window.scrollY > element.clientHeight) {
      element.classList.add(window.innerWidth > 1200 ? 'navbar-inverse' : 'navbar-inverse-phone');
    } else {
      element.classList.remove(window.innerWidth > 1200 ? 'navbar-inverse' : 'navbar-inverse-phone');
    }
  }

  removeNavbarInverse(): void {
    const element = document.querySelector('.inverse') as HTMLElement;
    element.classList.remove('navbar-inverse');
  }

  switchLang(): void {
    const lang = this.lang === 'ar' ? 'en' : 'ar'; // Toggle between 'en' and 'ar'
    this.translate.use(lang);
    localStorage.setItem('lang', lang);

    // Change direction
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    if (html && body) {
      html.setAttribute('lang', lang);
      html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      body.classList.remove(lang === 'ar' ? 'ltr' : 'rtl');
      body.classList.add(lang === 'ar' ? 'rtl' : 'ltr');
    }

    this.changeBtnGroupRadius();
    this.changeNavDrawer();
  }

  private changeBtnGroupRadius(): void {
    const labels = document.getElementsByTagName('label');
    const lang = localStorage.getItem('lang');
    const url = this.router.url;

    if (labels && url.includes('home')) {
      if (lang === 'ar') {
        labels[0].style.borderRadius = '0 3px 3px 0';
        labels[1].style.borderRadius = '3px 0 0 3px';
      } else {
        labels[0].style.borderRadius = '3px 0 0 3px';
        labels[1].style.borderRadius = '0 3px 3px 0';
      }
    }
    this.mirrorBackground(lang);
  }

  private mirrorBackground(lang: string | null): void {
    this.counter++;
    const styleElement = document.querySelector('style');
    const styleSheet = styleElement!.sheet;

    if (this.counter > 1 && styleSheet && styleSheet.cssRules.length > 0) {
      styleSheet.deleteRule(styleSheet.cssRules.length - 1);
    }

    if (styleSheet && lang === 'ar') {
      styleSheet.insertRule('#bg-shared::before { transform: scaleX(-1) !important; }', styleSheet.cssRules.length);
    } else if (styleSheet) {
      styleSheet.insertRule('#bg-shared::before { transform: scaleX(1) !important; }', styleSheet.cssRules.length);
    }
  }

  private changeNavDrawer(): void {
    const lang = localStorage.getItem('lang');
    const drawer = document.getElementById('offcanvasNavbar2');
    if (lang === 'ar') {
      drawer?.classList.remove('offcanvas-start');
      drawer?.classList.add('offcanvas-end');
    } else {
      drawer?.classList.remove('offcanvas-end');
      drawer?.classList.add('offcanvas-start');
    }
  }
}
