import {AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-floating-button',
  standalone: true,
  imports: [
    NgIf,
    TranslatePipe
  ],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.scss'
})
export class FloatingButtonComponent implements AfterViewInit {

  isVisible = false; // Estado para mostrar/ocultar el botón
  mainContainer!: HTMLElement;

  constructor(private renderer: Renderer2) { }


  ngAfterViewInit(): void {
    // Buscar el contenedor `#main` directamente en el DOM
    this.mainContainer = this.renderer.selectRootElement('#main', true);

    if (this.mainContainer) {
      // Escuchar el evento de scroll en el contenedor
      this.mainContainer.addEventListener('scroll', this.onScroll.bind(this));
    } else {
      console.error('mainContainer no se encontró');
    }
  }

  onScroll(): void {
    const scrollPosition = this.mainContainer.scrollTop || 0;
    this.isVisible = scrollPosition > 200; // Mostrar botón si se desplazó más de 200px
  }

  // Función para volver al inicio de la página
  scrollToTop(): void {
    const targetElement = this.renderer.selectRootElement('#header', true);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

}
