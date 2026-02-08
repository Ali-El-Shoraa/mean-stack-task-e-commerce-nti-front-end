// src/app/pages/profile/components/settings/settings.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../../core/toast/toast.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  settings = { profileVisible: true, showEmail: true };
  password = { current: '', newPass: '' };
  showDeleteModal = false;
  deleteConfirm = '';

  constructor(private toast: ToastService) {}

  onToggle(name: string) {
    this.toast.show(`تم تحديث ${name}`);
  }
}
