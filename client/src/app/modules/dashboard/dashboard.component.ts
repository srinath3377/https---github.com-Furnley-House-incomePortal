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
      // Your form submission logic here
    } else {
      // Mark all controls as touched to show validation messages
      this.investmentForm.markAllAsTouched();
    }
  }
  resetForm() {
    this.investmentForm.reset();
  }

  calculatePortfolioLifetime() {
    // const avgReturn = (this.returnFromStructures + this.growthEngineReturn + this.cashReturn) / 3;
    // this.portfolioLifetime = Math.round((this.initialInvestment / this.initialIncome) / (avgReturn / 100));
  }

  renderChart() {
    // const canvas = document.getElementById('investmentChart') as HTMLCanvasElement;
    // const ctx = canvas?.getContext('2d');
  
    // if (ctx) {
    //   new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //       labels: Array.from({ length: 24 }, (_, i) => i + 1), // 24 years for demo
    //       datasets: [{
    //         label: 'Year End Value',
    //         data: this.generateYearEndValues(),
    //         backgroundColor: 'rgba(170, 206, 101, 0.8)',
    //       }, {
    //         label: 'Annual Income',
    //         data: this.generateAnnualIncome(),
    //         backgroundColor: 'rgba(0, 0, 0, 0.7)',
    //         type: 'line'
    //       }]
    //     }
    //   });
    // } else {
    //   console.error('Unable to get 2D context from canvas.');
    // }
  }
  

  generateYearEndValues() {
    // // Generate random values for the year end values
    // let values = [];
    // let currentValue = this.initialInvestment;
    // for (let i = 1; i <= 24; i++) {
    //   currentValue -= this.initialIncome;
    //   values.push(currentValue > 0 ? currentValue : 0);
    // }
    // return values;
  }

  generateAnnualIncome() {
  //   // Generate random values for annual income
  //   let values = [];
  //   let currentIncome = this.initialIncome;
  //   for (let i = 1; i <= 24; i++) {
  //     values.push(currentIncome);
  //     currentIncome += currentIncome * (this.withdrawalIncrease / 100);
  //   }
  //   return values;
  // }
  }
  downloadPDF(): void {
    const element = document.querySelector('.investment-forecaster') as HTMLElement;
  
    // Hide the button container before generating the PDF
    const buttonContainer = element.querySelector('.button-container') as HTMLElement;
    if (buttonContainer) {
      buttonContainer.style.display = 'none';
    }
  
    // Convert the desired content (without the button) to a canvas
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 page width in mm
      const pageHeight = 297; // A4 page height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
  
      let position = 0;
  
      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      // If content overflows, add new pages
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      // Show the button again after generating the PDF
      if (buttonContainer) {
        buttonContainer.style.display = 'flex';
      }
  
      // Save the PDF
      pdf.save('investment-forecaster.pdf');
    });
  }
  
}