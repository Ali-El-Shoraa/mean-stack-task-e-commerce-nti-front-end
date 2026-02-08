// src/app/pages/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfileSidebarComponent } from '../profile-sidebar.component/profile-sidebar.component';
import { PersonalInfoComponent } from '../personal-info.component/personal-info.component';
import { OrdersComponent } from '../orders.component/orders.component';
import { WishlistComponent } from '../wishlist.component/wishlist.component';
import { AddressesComponent } from '../addresses.component/addresses.component';
import { SettingsComponent } from '../settings.component/settings.component';
import { NotificationsComponent } from '../notifications.component/notifications.component';
import { ProfileService } from '../../../../../core/services/profile.service';
import { WishlistService } from '../../../../../core/services/wishlist.service';
import { User } from '../../../../../core/models/interfaces.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileSidebarComponent,
    PersonalInfoComponent,
    OrdersComponent,
    WishlistComponent,
    AddressesComponent,
    SettingsComponent,
    NotificationsComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  activeTab = 'personal';
  user: User | null = null;
  stats = { orders: 0, wishlist: 0, reviews: 0, points: 0 };

  constructor(
    private profileService: ProfileService,
    private wishlistService: WishlistService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // جلب البروفايل
    this.profileService.getProfile().subscribe((data) => {
      this.user = data.profile;
    });

    // جلب المفضلة
    this.wishlistService.getWishlist().subscribe();

    // Check URL fragment
    this.route.fragment.subscribe((fragment) => {
      if (fragment) this.activeTab = fragment;
    });
  }

  onTabChange(tab: string) {
    this.activeTab = tab;
    window.location.hash = tab;
  }
}
