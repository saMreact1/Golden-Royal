import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Expertise } from '../../core/models/expertise.model';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  template: `
    <div class="container" style="padding: 2rem;">

      <span style="display: flex; justify-content: center;">
        <img [src]="data.icon" alt="{{ data.title }} icon" style="width: 20%;">
      </span>

      <h1 mat-dialog-title style="font-weight: 600;">{{ data.title }}</h1>

      <div mat-dialog-content>
        <p [innerHTML]="data.description"></p>
      </div>

      <div mat-dialog-actions style="display: flex; justify-content: right; margin-top: 1.5rem;">
        <button mat-raised-button mat-dialog-close style="background-color: #0c1e46; color: #D3AF37; padding: 0.5rem 1rem; border-radius: 4px; border: none; font-weight: bold;">Close</button>
      </div>

    </div>
  `,
  styles: [
    `
    .container {
      background: #f6f6f7;

      p {
        font-size: 1rem;
      }
    }
    @media (max-width: 600px) {
      .container {
        padding: 1rem .5rem !important;
      }
    }`
  ]
})

export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Expertise
  ) {}

  close() {
  }
}