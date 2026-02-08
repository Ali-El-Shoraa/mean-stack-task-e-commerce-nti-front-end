// src/app/pages/profile/components/personal-info/personal-info.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../../core/services/profile.service';
import { ToastService } from '../../../../../core/toast/toast.service';
import { User } from '../../../../../core/models/interfaces.model';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent {
  @Input() user: User | null = null;

  isEditing = false;
  editData = { firstName: '', lastName: '', phone: '' };

  constructor(
    private profileService: ProfileService,
    private toast: ToastService,
  ) {}

  toggleEdit() {
    if (!this.isEditing && this.user) {
      this.editData = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phone: this.user.phone,
      };
      this.isEditing = true;
    } else {
      this.saveChanges();
    }
  }

  saveChanges() {
    this.profileService.updateMe(this.editData).subscribe({
      next: () => {
        this.isEditing = false;
        this.toast.show('تم حفظ التغييرات بنجاح');
      },
      error: (err) => {
        this.toast.show(err.error?.message || 'حدث خطأ', 'error');
      },
    });
  }
}
