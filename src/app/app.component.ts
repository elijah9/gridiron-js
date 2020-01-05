import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gridiron-ng';
  hideGame = true;

  newGame() {
    if(this.hideGame) {
      this.hideGame = false;
    }
  }
}
