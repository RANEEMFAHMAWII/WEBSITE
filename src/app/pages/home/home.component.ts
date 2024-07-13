import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  lang;
  statisAbout: any = {
    ar :
    "وجود نظام متكامل يعني عرض أفضل للأداء على مستويات مختلفة كتنفيذ ناجح لنظام تخطيط موارد المؤسسات يمكن أن ينقذ عشرات الملايين",
    en: "Having an integrated system means a better view of perforimance at various levels as successful implementation of an erp system can save tens of millions"
  }
  constructor(
    private homeService: HomeService,
    private translate: TranslateService,
    ) {}

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event) => {
      this.lang = event.lang;
    });
    if (!this.lang) this.lang = this.translate.currentLang


  }

}

