import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar.component/sidebar.component';
import { FooterComponent } from '../../shared/components/footer.component/footer.component';
import { DashboardService } from '../../../core/services/dashboard.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../../shared/components/header.component/header.component';

@Component({
  selector: 'app-root-layout',
  imports: [RouterOutlet, SidebarComponent, FooterComponent, HeaderComponent],
  templateUrl: './root-layout.html',
  styleUrl: './root-layout.scss',
})
export class RootLayout {
  sidebarOpen = false;
  private subscription!: Subscription;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.subscription = this.dashboardService.sidebarOpen$.subscribe(
      (open) => (this.sidebarOpen = open),
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.sidebarOpen) {
      this.dashboardService.closeSidebar();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 1200 && this.sidebarOpen) {
      this.dashboardService.closeSidebar();
    }
  }
}
