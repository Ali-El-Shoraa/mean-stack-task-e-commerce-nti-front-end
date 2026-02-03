// src/app/components/charts/charts.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { DashboardService } from '../../../../../core/services/dashboard.service';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  // Sales Chart
  salesChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [],
  };
  salesChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        rtl: true,
        labels: {
          font: { family: 'Cairo', size: 12, weight: 'bold' },
          padding: 10,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          callback: (value) => '$' + value,
          font: { family: 'Cairo', size: 10 },
        },
      },
      x: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { font: { family: 'Cairo', size: 10 }, maxRotation: 0 },
      },
    },
  };
  salesChartType: ChartType = 'line';

  // Gender Chart
  genderChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [],
  };
  genderChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        rtl: true,
        labels: {
          font: { family: 'Cairo', size: 11, weight: 'bold' },
          padding: 15,
          usePointStyle: true,
        },
      },
    },
  };
  genderChartType: ChartType = 'doughnut';

  selectedPeriod = 'أسبوع';
  periods = ['أسبوع', 'شهر', 'ربع سنة', 'سنة'];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    const salesData = this.dashboardService.getSalesChartData();
    this.salesChartData = {
      labels: salesData.labels,
      datasets: [
        {
          label: 'المبيعات ($)',
          data: salesData.data,
          borderColor: '#e63946',
          backgroundColor: 'rgba(230, 57, 70, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#e63946',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };

    const genderData = this.dashboardService.getGenderChartData();
    this.genderChartData = {
      labels: genderData.labels,
      datasets: [
        {
          data: genderData.data,
          backgroundColor: ['#457b9d', '#f4a261', '#4cc9f0'],
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 10,
        },
      ],
    };
  }

  onPeriodChange(period: string): void {
    this.selectedPeriod = period;
    // يمكن إضافة منطق لتحديث البيانات حسب الفترة
  }
}
