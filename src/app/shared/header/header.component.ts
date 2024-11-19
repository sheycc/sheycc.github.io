import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

import { AuthService } from "../../auth/services/auth.service";
import { PrimengModule } from "../../primeng/primeng.module";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    PrimengModule,
    TranslatePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {

  // Referencias a los elementos de los botones de idioma
  @ViewChild('englishButton') englishButton!: ElementRef;
  @ViewChild('spanishButton') spanishButton!: ElementRef;

  selectedLanguage = 'en'; // Idioma predeterminado
  constructor(private auth: AuthService,
              private translate: TranslateService,
              private renderer: Renderer2) {  }

  ngAfterViewInit(): void {
    this.updateActiveClass();
  }

  isAdmin() {
    return this.auth.user.uid;
  }

  logout() {
    this.auth.logout();
  }

  // Método para cambiar el idioma
  switchLanguage(language: string) {
    this.translate.use(language);
    this.selectedLanguage = language;
    this.updateActiveClass();
  }

  private updateActiveClass() {
    // Quita la clase 'active' de ambos botones
    if(this.englishButton && this.spanishButton){
      this.renderer.removeClass(this.englishButton.nativeElement, 'active');
      this.renderer.removeClass(this.spanishButton.nativeElement, 'active');

      // Añade la clase 'active' solo al botón seleccionado
      if (this.selectedLanguage === 'en') {
        this.renderer.addClass(this.englishButton.nativeElement, 'active');
      } else {
        this.renderer.addClass(this.spanishButton.nativeElement, 'active');
      }
    }
  }

}
