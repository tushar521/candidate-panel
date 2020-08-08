import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/general.service';
import { UtilsService } from 'src/app/core/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public emailId

  constructor(private router: Router,
    public utilsService: UtilsService,
    public generalSerice: GeneralService) { }

  ngOnInit() {
  }



  validateEmail(email) {
    if (!email) return false
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  goToScreen(path) {
    this.router.navigate([path])
  }

  forgotPassword() {
    if (!this.emailId || !this.validateEmail(this.emailId)) {
      this.utilsService.showMessage('error', 'Error', 'Please add proper email address')
    }
    const json = {
      email: this.emailId
    }
    this.generalSerice.forgotPasswordAPICall(json).subscribe((response) => {
      this.router.navigate(['/login'])
      this.utilsService.showMessage('success', 'Success', 'We have sent your password to your registered email. Please check')
    }, (error) => {
      if (error && 'error' in error && 'message' in error.error) {
        this.utilsService.showMessage('error', 'Error', error.error.message)
      }
    })
  }

}
