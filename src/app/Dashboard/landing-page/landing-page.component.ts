import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public imageUrls = []
  // public height = "50%"

  constructor(public router: Router) { }

  ngOnInit() {
    sessionStorage.setItem('sF', '0');
    this.imageUrls = [
      "https://res.cloudinary.com/vipul8896/image/upload/v1588408802/ecommerce-2140603_1280.jpg",
      "https://res.cloudinary.com/vipul8896/image/upload/v1588408562/shopping-bags-4057173_1280.webp",
      "https://res.cloudinary.com/vipul8896/image/upload/v1588408756/ecommerce-3546296_1280.jpg"
    ]
  }

  goToScreen(index) {
    sessionStorage.setItem('sF', index)
    this.router.navigate(['/dashboard'])
  }

}

// "https://res.cloudinary.com/vipul8896/image/upload/v1588407153/slide2jpg.jpg",
// "https://res.cloudinary.com/vipul8896/image/upload/v1588406303/1.png",
// "https://res.cloudinary.com/vipul8896/image/upload/v1588406323/2.png",
// "https://res.cloudinary.com/vipul8896/image/upload/v1588406341/3.jpg",
// "https://res.cloudinary.com/vipul8896/image/upload/v1588406354/4.png"
