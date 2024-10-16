import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  // standalone: true,
  // imports: [],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  showCustomHeader = false;
  steps = ['Basic info', 'Relationships', 'Health', 'Vulnerability', 'Employment', 'Income', 'Expenditure', 'Assets', 'Liabilities'];
  activeStep = 0;

  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  logout(): void {
    this.router.navigate(['/authentication/signin'])
  }

  previous(): void {
  }

  saveAndNext(): void {
    this.showCustomHeader = true;
    this.router.navigate(['/dashboard/basic-info'])
  }

  home() {
    this.showCustomHeader = false;
    this.router.navigate(['/dashboard'])
  }
  
}

