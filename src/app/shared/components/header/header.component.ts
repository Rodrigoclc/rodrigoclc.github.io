import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

}
