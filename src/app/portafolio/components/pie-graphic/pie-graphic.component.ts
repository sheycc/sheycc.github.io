import {Component, OnInit} from '@angular/core';
import { ChartModule } from "primeng/chart";
import { NgIf } from "@angular/common";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-pie-graphic',
  standalone: true,
  imports: [
    ChartModule,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './pie-graphic.component.html',
  styleUrl: './pie-graphic.component.scss'
})
export class PieGraphicComponent implements OnInit{

  data: any;
  options: any;
  ratings: number[] = [];

  study_label = '';
  intern_label = '';
  work_label = '';
  months = '';
  years = '';
  and = '';

  public brightColors: string[] = [
    'rgba(245,106,106,0.32)',
    'rgba(245,106,106,0.62)',
    'rgb(245, 106, 106)',
  ];

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.loadTranslations(); // Cargar traducciones iniciales

    // Escuchar cambios de idioma
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  loadTranslations() {
    this.translate.get([
      'PIE_GRAPHIC.STUDY_LABEL',
      'PIE_GRAPHIC.INTERNSHIP_LABEL',
      'PIE_GRAPHIC.WORK_LABEL',
      'PIE_GRAPHIC.MONTHS_LABEL',
      'PIE_GRAPHIC.YEARS_LABEL',
      'PIE_GRAPHIC.AND'
    ]).subscribe(translations => {
      this.study_label = translations['PIE_GRAPHIC.STUDY_LABEL'];
      this.intern_label = translations['PIE_GRAPHIC.INTERNSHIP_LABEL'];
      this.work_label = translations['PIE_GRAPHIC.WORK_LABEL'];
      this.months = translations['PIE_GRAPHIC.MONTHS_LABEL'];
      this.years = translations['PIE_GRAPHIC.YEARS_LABEL'];
      this.and = translations['PIE_GRAPHIC.AND'];

      // Actualizar datos del gráfico
      this.getGraphicData();

      // Actualizar opciones del gráfico (si es necesario)
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.options = {
        responsive: true,
        aspectRatio: 0.6,
        maintainAspectRatio: false,
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
                return `${label} ${value} ${this.months}`;
              }
            }
          }
        }
      };
    });
  }

  getGraphicData() {
    this.getRatings();
    const backgroundColors = this.brightColors.slice(0, this.ratings.length);

    this.data = {
      labels: [
        `${this.study_label}: ${this.formatMonthsToYearsAndMonths(this.ratings[0])}`,
        `${this.intern_label}: ${this.formatMonthsToYearsAndMonths(this.ratings[1])}`,
        `${this.work_label}: ${this.formatMonthsToYearsAndMonths(this.ratings[2])}`
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

    const practiceStartDate = new Date('2020-01-10');
    const practiceEndDate = new Date('2022-01-12');

    const workStartDate = new Date('2023-01-01');

    this.ratings[0] = 60;
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
      result += `${years} ${this.years}`;
    }
    if (months > 0) {
      result += years > 0 ? ` ${this.and} ${months} ${this.months}` : `${months} ${this.months}`;
    }

    return result || `0 ${this.months}`; // Devuelve "0 meses" si ambos valores son 0
  }


}
