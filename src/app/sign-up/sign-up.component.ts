import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router }  from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccessToken } from '../access-token';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.signup(this.loginForm.getRawValue())
        .subscribe((accessToken: AccessToken) => {
         
          localStorage.setItem('accessToken', accessToken.accessToken);

          this.router.navigate(['/']);
        })
    } else {
      console.log('Form is invalid!');
    }
  }
}
