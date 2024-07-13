import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  navbar = document.querySelector('app-navbar')
  footer = document.querySelector('app-footer')

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.navbar?.classList.add("d-none")
    this.footer?.classList.add("d-none")
  }

  ngOnDestroy(){
    this.navbar?.classList.remove("d-none")
    this.footer?.classList.remove("d-none")
  }
}
