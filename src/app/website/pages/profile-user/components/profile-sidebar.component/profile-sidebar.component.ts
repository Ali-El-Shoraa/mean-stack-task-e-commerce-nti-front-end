// src/app/pages/profile/components/profile-sidebar/profile-sidebar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../core/models/interfaces.model';
import { WishlistService } from '../../../../../core/services/wishlist.service';

@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss'],
})
export class ProfileSidebarComponent {
  @Input() user: User | null = null;
  @Input() activeTab = 'personal';
  @Output() tabChanged = new EventEmitter<string>();

  menuItems = [
    { id: 'personal', icon: 'bi-person', label: 'المعلومات الشخصية' },
    { id: 'orders', icon: 'bi-bag', label: 'طلباتي' },
    { id: 'wishlist', icon: 'bi-heart', label: 'قائمة الرغبات' },
    { id: 'addresses', icon: 'bi-geo-alt', label: 'العناوين' },
    { id: 'settings', icon: 'bi-gear', label: 'الإعدادات' },
    { id: 'notifications', icon: 'bi-bell', label: 'الإشعارات' },
  ];

  constructor(public wishlistService: WishlistService) {}

  get fullName(): string {
    if (!this.user) return '';
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  onMenuClick(tabId: string, event: Event) {
    event.preventDefault();
    this.tabChanged.emit(tabId);
  }
}
