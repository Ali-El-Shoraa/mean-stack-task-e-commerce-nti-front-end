// src/app/pages/profile/components/addresses/addresses.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Address } from '../../../../../core/models/interfaces.model';
import { ProfileService } from '../../../../../core/services/profile.service';
import { ToastService } from '../../../../../core/toast/toast.service';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss',
})
export class AddressesComponent implements OnInit {
  addresses: Address[] = [];
  showModal = false;

  newAddress = {
    label: '',
    fullName: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'المملكة العربية السعودية',
    isDefault: false,
  };

  constructor(
    private profileService: ProfileService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.profileService.addresses$.subscribe((a) => (this.addresses = a));
  }

  openAddModal() {
    this.resetForm();
    this.showModal = true;
  }

  addAddress() {
    this.profileService.addAddress(this.newAddress).subscribe({
      next: () => {
        this.showModal = false;
        this.toast.show('تم إضافة العنوان بنجاح');
        this.resetForm();
      },
      error: (err) => this.toast.show(err.error?.message || 'حدث خطأ', 'error'),
    });
  }

  deleteAddress(id: string) {
    if (confirm('هل أنت متأكد من حذف هذا العنوان؟')) {
      this.profileService.deleteAddress(id).subscribe({
        next: () => this.toast.show('تم حذف العنوان بنجاح'),
        error: () => this.toast.show('حدث خطأ', 'error'),
      });
    }
  }

  setDefault(id: string) {
    this.profileService.setDefaultAddress(id).subscribe({
      next: () => this.toast.show('تم تعيين العنوان كافتراضي'),
      error: () => this.toast.show('حدث خطأ', 'error'),
    });
  }

  private resetForm() {
    this.newAddress = {
      label: '',
      fullName: '',
      phone: '',
      street: '',
      city: '',
      postalCode: '',
      country: 'المملكة العربية السعودية',
      isDefault: false,
    };
  }
}
