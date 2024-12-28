import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user: any;

  constructor(private authService: AuthService) {
    const auth = getAuth();
    this.user = auth.currentUser;
  }
  signOut() {
    this.authService.signOut();
  }
}
