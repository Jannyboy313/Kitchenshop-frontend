import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {

  private previousPreviousPreviousUrl: string;
  private previousPreviousUrl: string;
  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousPreviousPreviousUrl = this.previousPreviousUrl;
        this.previousPreviousUrl = this.previousUrl;
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  getHistoryUrl(timesBack: number) {
    switch(timesBack) {
      case 1:
        return this.previousUrl;
      case 2:
        return this.previousPreviousUrl;
      case 3:
        return this.previousPreviousPreviousUrl;
    }
  }
}