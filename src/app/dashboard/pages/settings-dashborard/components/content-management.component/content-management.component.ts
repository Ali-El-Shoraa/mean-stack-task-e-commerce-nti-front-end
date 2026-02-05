// src/app/features/content-management/content-management.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentTab } from '../../../../../core/models/content.model';
import { HomeContentComponent } from '../home-content.component/home-content.component';
import { ContactContentComponent } from '../contact-content.component/contact-content.component';
import { AboutContentComponent } from '../about-content.component/about-content.component';

@Component({
  selector: 'app-content-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HomeContentComponent,
    ContactContentComponent,
    AboutContentComponent,
  ],
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss'],
})
export class ContentManagementComponent {
  activeTab = signal<ContentTab>('home');

  tabs: { id: ContentTab; label: string }[] = [
    { id: 'home', label: 'الصفحة الرئيسية' },
    { id: 'contact', label: 'اتصل بنا' },
    { id: 'about', label: 'من نحن' },
  ];

  setActiveTab(tab: ContentTab): void {
    this.activeTab.set(tab);
  }

  preview(): void {
    this.showNotification('جارٍ فتح المعاينة...', 'info');
  }

  publish(): void {
    this.showNotification('جارٍ نشر التغييرات...', 'info');
    setTimeout(() => {
      this.showNotification('تم نشر التغييرات بنجاح!', 'success');
    }, 1500);
  }

  private showNotification(message: string, type: 'success' | 'info' | 'warning'): void {
    console.log(`[${type}] ${message}`);
  }
}
