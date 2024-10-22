import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboard',
  // standalone: true,
  // imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router,private fb: FormBuilder) { 
    this.investmentForm = this.fb.group({
      clientName: ['', Validators.required],
      policyType: ['', Validators.required],
      investmentAmount: ['', Validators.required],
      incomeLevel: ['', Validators.required],
      withdrawalsIncrease: ['', Validators.required],
      riskProfile: ['', Validators.required],
      returnStructures: ['', Validators.required],
      netReturn: ['', Validators.required],
      returnOnCash: ['', Validators.required]
    });
  }
  // clientName: string = '';
  // policyType: string = 'Overall Portfolio';
  // initialInvestment: number = 450000;
  // initialIncome: number = 27000;
  // withdrawalIncrease: number = 2.5;
  // riskProfile: number = 40;

  // returnFromStructures: number = 5.8;
  // growthEngineReturn: number = 5.4;
  // cashReturn: number = 1.0;
  
  // portfolioLifetime: number = 23;
  investmentForm: FormGroup;

  ngOnInit() {
    // this.calculatePortfolioLifetime();
    this.renderChart();
  }
  onSubmit() {
    if (this.investmentForm.valid) {
      console.log(this.investmentForm.value);
    } else {
      this.investmentForm.markAllAsTouched();
    }
  }
  resetForm() {
    this.investmentForm.reset();
  }

  calculatePortfolioLifetime() {}

  renderChart() {}
  
  generateYearEndValues() {}

  generateAnnualIncome() {}

  downloadPDF(): void {
    const element = document.querySelector('.investment-forecaster') as HTMLElement;
  
    const buttonContainer = element.querySelector('.button-container') as HTMLElement;
    if (buttonContainer) {
      buttonContainer.style.display = 'none';
    }
      html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 page width in mm
      const pageHeight = 297; // A4 page height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
  
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      if (buttonContainer) {
        buttonContainer.style.display = 'flex';
      }
  
      pdf.save('investment-forecaster.pdf');
    });
  }
  
}