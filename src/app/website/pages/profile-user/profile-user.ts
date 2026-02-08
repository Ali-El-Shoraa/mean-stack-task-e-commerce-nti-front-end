import { Component } from '@angular/core';
import { ProfileComponent } from './components/profile.component/profile.component';

@Component({
  selector: 'app-profile-user',
  imports: [ProfileComponent],
  templateUrl: './profile-user.html',
  styleUrl: './profile-user.scss',
})
export class ProfileUser {}
