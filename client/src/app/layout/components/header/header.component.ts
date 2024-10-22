import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  // standalone: true,
  // imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {} 
  
  logout(): void {
    if (confirm('Do you really want to log out?')) {
      localStorage.removeItem('isAuthenticated');
      this.router.navigate(['/signin']);
    }
  }
  
}
