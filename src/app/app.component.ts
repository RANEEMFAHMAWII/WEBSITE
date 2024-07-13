import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  lang: string;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cookieService: CookieService
    ) {
    this.lang = localStorage.getItem('lang') || 'ar';
    let html = document.querySelector('html');
    let body = document.querySelector('body');
    this.translate.use(this.lang);
    html?.setAttribute('lang', this.lang);
    html?.setAttribute('dir', this.lang ==  'ar' ? 'rtl': 'ltr');
    body?.classList.remove(this.lang ==  'en' ? 'rtl': 'ltr');
    body?.classList.add(this.lang ==  'ar' ? 'rtl': 'ltr');
    this.mirrorBackground(this.lang);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!event.url.includes("home")) {
          window.scrollTo(0, 0); // Scroll to the top of the page
        }
      }
    });
  }
  private mirrorBackground(lang) {
    const styleElement = document.querySelector('style');
    const styleSheet = styleElement!.sheet;

    // Check if there's an existing rule at index 0
    if (lang == 'ar') {
      // If no rule exists, simply insert a new one
      styleSheet!.insertRule(
        '#bg-shared::before { transform: scaleX(-1); }'
      );
    } else {
      styleSheet!.insertRule(
        '#bg-shared::before { transform: scaleX(1); }'
      );
    }
  }

  showSplash = true;
  ngOnInit(){
    const isPageReload = this.cookieService.get('firstLoad') !== 'true';
    if (isPageReload) {
      setTimeout(()=>{
        this.showSplash=false;
        this.cookieService.set('firstLoad', 'true');      
      },5000);
    } else {
      this.showSplash = false;
    }
  }
}
