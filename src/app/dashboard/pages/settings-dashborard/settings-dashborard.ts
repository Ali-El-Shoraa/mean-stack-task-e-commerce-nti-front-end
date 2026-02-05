import { Component } from '@angular/core';
import { SettingsComponent } from './components/settings.component/settings.component';
import { ContentManagementComponent } from './components/content-management.component/content-management.component';

@Component({
  selector: 'app-settings-dashborard',
  imports: [SettingsComponent, ContentManagementComponent],
  templateUrl: './settings-dashborard.html',
  styleUrl: './settings-dashborard.scss',
})
export class SettingsDashborard {}
