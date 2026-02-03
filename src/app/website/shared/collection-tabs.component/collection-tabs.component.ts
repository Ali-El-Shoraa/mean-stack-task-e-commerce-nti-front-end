import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-collection-tabs-component',
  imports: [CommonModule],
  templateUrl: './collection-tabs.component.html',
  styleUrl: './collection-tabs.component.scss',
})
export class CollectionTabsComponent {
  activeTab = input<string>('all');
  tabChanged = output<string>();

  onTabClick(category: string) {
    this.tabChanged.emit(category);
  }
}
