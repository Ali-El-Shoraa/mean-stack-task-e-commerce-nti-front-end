// src/app/components/quick-actions/quick-actions.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuickAction } from '../../../../../core/models/dashboard.models';
import { DashboardService } from '../../../../../core/services/dashboard.service';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss'],
})
export class QuickActionsComponent implements OnInit {
  quickActions: QuickAction[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.quickActions = this.dashboardService.getQuickActions();
  }
}
