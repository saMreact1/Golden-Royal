import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invite',
  standalone: false,
  templateUrl: './invite.html',
  styleUrl: './invite.scss',
})
export class Invite {
  inviteForm: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      private snack: MatSnackBar
    ) {
      this.inviteForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
    }
  
    onSubmit() {
      this.snack.open('Invitation form submitted', 'Close', { duration: 3000 });
    }
}
