import { Component, inject } from '@angular/core';
import {MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-message',
  templateUrl: './snack-message.component.html',
  styles: [
    `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: white;
    }
  `,
  ],
})
export class SnackMessageComponent {
  snackBarRef = inject(MatSnackBarRef);
}
