import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/utils.service';
import { GeneralService } from 'src/app/core/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public emailId = ''
  public password = ''

  constructor(public utilsService: UtilsService,
    public generalSerice: GeneralService,
    public router: Router) { }

  ngOnInit() {
    sessionStorage.clear();
  }

  signIn() {
    if (!this.emailId || !this.password || this.password.length === 0) {
      this.utilsService.showMessage('error', 'Error', 'Please enter a valid username and password')
      return true;
    }
    this.utilsService.enableLoading = true;
    this.generalSerice.loginAPICall({ username: this.emailId, password: this.password }).subscribe((response: any) => {
      this.utilsService.enableLoading = false;
      sessionStorage.setItem('isLoggedIn', 'true')
      sessionStorage.setItem('token', response.data.token)
      sessionStorage.setItem('user_code', response.data.user_code)
      sessionStorage.setItem('email', response.data.email)
      this.goToScreen('/dashboard')
    }, (error: any) => {
      this.utilsService.enableLoading = false;
      let msg = 'Something went wrong'
      if (error && error.error && error.error.message) msg = error.error.message
      this.utilsService.showMessage('error', 'Error', msg)
    })
  }

  validateEmail(email) {
    if (!email) return false
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  goToScreen(path) {
    this.router.navigate([path])
  }

}
