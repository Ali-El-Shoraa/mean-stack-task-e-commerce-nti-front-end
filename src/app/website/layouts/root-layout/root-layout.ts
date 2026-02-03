import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header.component/header.component';
import { FooterComponent } from '../../shared/footer.component/footer.component';
@Component({
  selector: 'app-root-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './root-layout.html',
  styleUrl: './root-layout.scss',
})
export class RootLayout {}
