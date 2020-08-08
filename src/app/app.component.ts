import { Component, OnInit } from '@angular/core';
import { UtilsService } from './core/utils.service';
import { ToasterConfig } from 'angular2-toaster';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Candidate';
  public isLoggedIn = 'false'

  public config: ToasterConfig = new ToasterConfig({
    showCloseButton: false,
    tapToDismiss: false,
    timeout: 3000,
    limit: 1,
    positionClass: 'toast-bottom-full-width'
  });

  constructor(
    public utilsService: UtilsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') || 'false'
  }

  goToScreen(path) {
    if (path === '/login' && sessionStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/dashboard/profile'])
    } else {
      this.router.navigate([path])
    }

  }

  removeClass() {
    $('.navbar-collapse').removeClass('show');
  }

}
