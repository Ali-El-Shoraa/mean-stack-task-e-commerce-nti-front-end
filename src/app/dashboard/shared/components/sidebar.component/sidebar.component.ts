// src/app/components/sidebar/sidebar.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from '../../../../core/models/dashboard.models';
import { DashboardService } from '../../../../core/services/dashboard.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  isOpen = false;
  private subscription!: Subscription;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.menuItems = this.dashboardService.getMenuItems();
    this.subscription = this.dashboardService.sidebarOpen$.subscribe(
      (open) => (this.isOpen = open),
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  closeSidebar(): void {
    this.dashboardService.closeSidebar();
  }

  logout(): void {
    console.log('Logging out...');
  }
}
