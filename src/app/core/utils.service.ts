import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public toasterService: ToasterService
  ) { }

  public enableLoading = false;

  showMessage(type, subject, msg) {
    return this.toasterService.popAsync(type, subject, msg)
  }
}
