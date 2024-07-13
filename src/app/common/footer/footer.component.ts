import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FooterService } from './footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: number = new Date().getFullYear();
  socialMedia;

  constructor(
    public router: Router,
    public footerService: FooterService,
    public scroller: ViewportScroller
  ) { }

  ngOnInit() {

  }

  scroll(nav) {
    this.router.navigate(['/home']);
    setTimeout(() => {
      this.scroller.scrollToAnchor(nav)
    }, 100);
  }



}
