import { Component } from '@angular/core';
import { CustomersComponent } from './components/customers.component/customers.component';

@Component({
  selector: 'app-clients-dashborard',
  imports: [CustomersComponent],
  templateUrl: './clients-dashborard.html',
  styleUrl: './clients-dashborard.scss',
})
export class ClientsDashborard {}
