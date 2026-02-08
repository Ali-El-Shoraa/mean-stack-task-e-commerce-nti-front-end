// src/app/shared/toast/toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toasts.asObservable();
  private counter = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    const id = ++this.counter;
    const toast: Toast = { message, type, id };
    this.toasts.next([...this.toasts.value, toast]);

    setTimeout(() => this.remove(id), 3000);
  }

  remove(id: number) {
    this.toasts.next(this.toasts.value.filter((t) => t.id !== id));
  }
}
