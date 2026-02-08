// features/auth/pages/login-page/login-page.ts

import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);

  showPassword = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    this.authService.login({ email, password }).subscribe();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}

// import { Component, inject } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../../../core/services/auth.service';

// @Component({
//   selector: 'app-login-page',
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './login-page.html',
//   styleUrl: './login-page.scss',
// })
// export class LoginPage {
//   private fb = inject(FormBuilder);
//   // جعل الخدمة public للوصول إلى الـ Signals في الـ HTML
//   public authService = inject(AuthService);

//   loginForm = this.fb.nonNullable.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', [Validators.required, Validators.minLength(6)]],
//   });

//   onLogin() {
//     if (this.loginForm.invalid) return;

//     // استدعاء الدالة والاشتراك (لأن الطلب بارد Cold Observable)
//     this.authService.login(this.loginForm.value).subscribe();
//   }

//   // loginForm: FormGroup;
//   // isLoading = false;
//   // errorMessage = '';

//   // constructor(
//   //   private fb: FormBuilder,
//   //   private authService: AuthService,
//   //   private router: Router,
//   // ) {
//   //   this.loginForm = this.fb.group({
//   //     email: ['', [Validators.required, Validators.email]],
//   //     password: ['', [Validators.required, Validators.minLength(6)]],
//   //     rememberMe: [false],
//   //   });
//   // }

//   // onLogin() {
//   //   if (this.loginForm.invalid) return;

//   //   this.isLoading = true;
//   //   this.errorMessage = '';

//   //   this.authService.login(this.loginForm.value).subscribe({
//   //     next: (res) => {
//   //       this.isLoading = false;
//   //       // this.router.navigate(['/dashboard']); // أو الصفحة الرئيسية
//   //     },
//   //     error: (err: { error: { message: string } }) => {
//   //       this.isLoading = false;
//   //       this.errorMessage = err.error.message || 'حدث خطأ أثناء تسجيل الدخول';
//   //     },
//   //   });
//   // }
// }
