import { Component } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent {

  showContent() {
    var elem = $("#lasercontent_btn").text();
    if (elem == "Read More") {
      $("#lasercontent_btn").text("Read Less");
      $("#laser_content").slideDown();
    } else {
      $("#lasercontent_btn").text("Read More");
      $("#laser_content").slideUp();
    }
  }
}
