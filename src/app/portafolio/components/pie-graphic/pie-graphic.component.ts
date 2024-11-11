import { Component } from '@angular/core';
import {ChartModule} from "primeng/chart";
import {NgIf} from "@angular/common";
import {Skill} from "../../../shared/interfaces/skill";
import {SkillsService} from "../../../shared/services/skills.service";

@Component({
  selector: 'app-pie-graphic',
  standalone: true,
    imports: [
        ChartModule,
        NgIf
    ],
  templateUrl: './pie-graphic.component.html',
  styleUrl: './pie-graphic.component.scss'
})
export class PieGraphicComponent {

  data: any;
  options: any;
  ratings: number[] = [];

  public brightColors: string[] = [
    'rgba(245,106,106,0.32)',
    'rgba(245,106,106,0.62)',
    'rgb(245, 106, 106)',
  ];

  constructor() { }

  ngOnInit() {
    this.getGraphicData();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.options = {
      responsive: true,  // Hace el gráfico adaptable
      aspectRatio: 0.6,
      maintainAspectRatio: false,  // Permite que el gráfico ocupe el tamaño completo del contenedor
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.dataset.label || '';
              const value = context.raw || '0';
              return `${label} ${value} months`;
            }
          }
        }
      }
    };
  }

  getGraphicData() {
    this.getRatings();
    const backgroundColors = this.brightColors.slice(0, this.ratings.length);

    this.data = {
      labels: [
        `Study Time: ${this.formatMonthsToYearsAndMonths(this.ratings[0])}`,
        `Internship Time: ${this.formatMonthsToYearsAndMonths(this.ratings[1])}`,
        `Work Time: ${this.formatMonthsToYearsAndMonths(this.ratings[2])}`
      ],
      datasets: [
        {
          data: this.ratings,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors
        }
      ]
    };
  }

  getRatings() {
    const studyStartDate = new Date('2016-01-09');
    const studyEndDate = new Date('2022-01-12');

    const practiceStartDate = new Date('2020-01-10');
    const practiceEndDate = new Date('2022-01-12');

    const workStartDate = new Date('2023-01-01');

    this.ratings[0] = this.calculateMonthsBetween(studyStartDate, studyEndDate);
    this.ratings[1] = this.calculateMonthsBetween(practiceStartDate, practiceEndDate);
    this.ratings[2] = this.calculateMonthsBetween(workStartDate, new Date());
  }

  calculateMonthsBetween(startDate: Date, endDate: Date): number {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth);
  }

  formatMonthsToYearsAndMonths(totalMonths: number): string {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let result = '';
    if (years > 0) {
      result += `${years} years`;
    }
    if (months > 0) {
      result += years > 0 ? ` and ${months} months` : `${months} months`;
    }

    return result || '0 months'; // Devuelve "0 meses" si ambos valores son 0
  }


}
