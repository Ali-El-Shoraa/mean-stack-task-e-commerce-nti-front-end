// src/app/components/header/header.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../../../core/services/dashboard.service';

@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchQuery = '';
  notificationCount = 5;

  constructor(private dashboardService: DashboardService) {}

  toggleSidebar(): void {
    this.dashboardService.toggleSidebar();
  }

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
  }
}
