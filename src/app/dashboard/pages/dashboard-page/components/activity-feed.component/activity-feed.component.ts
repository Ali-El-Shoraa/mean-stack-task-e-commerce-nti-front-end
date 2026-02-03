// src/app/components/activity-feed/activity-feed.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activity } from '../../../../../core/models/dashboard.models';
import { DashboardService } from '../../../../../core/services/dashboard.service';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss'],
})
export class ActivityFeedComponent implements OnInit {
  activities: Activity[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.activities = this.dashboardService.getActivities();
  }
}
