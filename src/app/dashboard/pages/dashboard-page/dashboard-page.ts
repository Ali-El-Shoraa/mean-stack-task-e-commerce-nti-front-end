import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header.component/header.component';
import { StatsCardsComponent } from './components/stats-cards.component/stats-cards.component';
import { ChartsComponent } from './components/charts.component/charts.component';
import { ActivityFeedComponent } from './components/activity-feed.component/activity-feed.component';
import { QuickActionsComponent } from './components/quick-actions.component/quick-actions.component';
import { OrdersTableComponent } from './components/orders-table.component/orders-table.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    StatsCardsComponent,
    ChartsComponent,
    ActivityFeedComponent,
    QuickActionsComponent,
    OrdersTableComponent,
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {}
