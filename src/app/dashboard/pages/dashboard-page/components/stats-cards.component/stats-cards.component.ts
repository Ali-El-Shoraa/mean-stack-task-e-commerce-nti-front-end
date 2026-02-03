// src/app/components/stats-cards/stats-cards.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCard } from '../../../../../core/models/dashboard.models';
import { DashboardService } from '../../../../../core/services/dashboard.service';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-cards.component.html',
  styleUrls: ['./stats-cards.component.scss'],
})
export class StatsCardsComponent implements OnInit {
  statsCards: StatsCard[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.statsCards = this.dashboardService.getStatsCards();
  }
}
