import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupService } from './services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: SignupService, 
    private _snackBar: MatSnackBar,   
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const values = this.form.value;
    this.api.postSignup(values).subscribe({
      next: () => {
        this._snackBar.open('Usuário criado com sucesso!!', '', {
          duration: 2000,
        });
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
