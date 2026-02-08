// features/auth/pages/register-page/register-page.ts

import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);

  currentStep = signal<number>(1);
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);

  registerForm = this.fb.nonNullable.group(
    {
      // الخطوة 1
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      gender: ['male'],

      // الخطوة 2
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],

      // الخطوة 3
      birthDate: [''],
      country: [''],
      city: [''],
      newsletter: [true],
      terms: [false, [Validators.requiredTrue]],
    },
    {
      validators: RegisterPage.passwordMatchValidator, // ✅ استخدام static
    },
  );

  // ✅ تحويلها لـ static method
  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // إذا لم تكتمل الحقول بعد
    if (!password || !confirmPassword) {
      return null;
    }

    // التحقق من التطابق
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    // ✅ مسح الخطأ إذا أصبحت متطابقة
    // لكن نحتفظ بالأخطاء الأخرى مثل required
    const errors = confirmPassword.errors;
    if (errors) {
      delete errors['mismatch'];
      confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  }

  // ✅ حساب قوة كلمة المرور
  getPasswordStrength(): { level: string; percent: number; color: string } {
    const password = this.registerForm.get('password')?.value || '';
    let score = 0;

    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // if (score <= 2) return { level: 'ضعيفة', percent: 33, color: '#ef4444' };
    // if (score <= 4) return { level: 'متوسطة', percent: 66, color: '#f59e0b' };
    return { level: 'قوية', percent: 100, color: '#10b981' };
  }

  // ✅ التنقل بين الخطوات
  nextStep(): void {
    if (this.validateCurrentStep()) {
      this.currentStep.update((step) => Math.min(step + 1, 3));
    } else {
      // ✅ إظهار الأخطاء للمستخدم
      this.markStepFieldsAsTouched();
    }
  }

  prevStep(): void {
    this.currentStep.update((step) => Math.max(step - 1, 1));
  }

  goToStep(step: number): void {
    if (step < this.currentStep()) {
      this.currentStep.set(step);
    }
  }

  // ✅ التحقق من صحة الخطوة الحالية
  validateCurrentStep(): boolean {
    const step = this.currentStep();
    const form = this.registerForm;

    if (step === 1) {
      const fields = ['firstName', 'lastName', 'email', 'phone'];
      return fields.every((field) => form.get(field)?.valid);
    }

    if (step === 2) {
      const password = form.get('password');
      const confirmPassword = form.get('confirmPassword');

      // ✅ التحقق من صحة الحقول + التطابق
      const fieldsValid = password?.valid && confirmPassword?.valid;
      const passwordsMatch = password?.value === confirmPassword?.value;

      return !!(fieldsValid && passwordsMatch);
    }

    return true;
  }

  // ✅ وضع علامة touched على حقول الخطوة الحالية
  markStepFieldsAsTouched(): void {
    const step = this.currentStep();
    let fields: string[] = [];

    if (step === 1) {
      fields = ['firstName', 'lastName', 'email', 'phone'];
    } else if (step === 2) {
      fields = ['password', 'confirmPassword'];
    }

    fields.forEach((field) => {
      this.registerForm.get(field)?.markAsTouched();
    });
  }

  // ✅ إرسال النموذج
  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, password, phone } = this.registerForm.getRawValue();

    this.authService
      .register({
        firstName,
        lastName,
        email,
        password,
        phone,
      })
      .subscribe();
  }

  togglePassword(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword.update((v) => !v);
    } else {
      this.showConfirmPassword.update((v) => !v);
    }
  }
}
