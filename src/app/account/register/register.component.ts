import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { ConfirmPassword } from '../../shared/Validators/Password.Validators';
import { ValidateEmailNotToken } from '../../shared/Validators/ValidateEmailNotToken.Validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];
  constructor(
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.CreateRequister();
  }
  CreateRequister() {
    this.registerForm = this.fb.group(
      {
        displayName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email],[ValidateEmailNotToken()]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { Validators: ConfirmPassword }
    );
  }
  get _displayName() {
    return this.registerForm.get('displayName');
  }
  get _email() {
    return this.registerForm.get('email');
  }
  get _password() {
    return this.registerForm.get('password');
  }
  get _confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  OnSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/shop');
      },
      error: (error) => {
        this.errors = error.errors;
      },
    });
  }
}
