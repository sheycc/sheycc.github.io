import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { TranslatePipe } from "@ngx-translate/core";

import { PrimengModule } from "../../../primeng/primeng.module";
import { SkillsGraphicComponent } from "../skills-graphic/skills-graphic.component";
import { TimelinesGraphicComponent } from "../timelines-graphic/timelines-graphic.component";
import { PieGraphicComponent } from "../pie-graphic/pie-graphic.component";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    PrimengModule,
    SkillsGraphicComponent,
    TimelinesGraphicComponent,
    PieGraphicComponent,
    TranslatePipe
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit{

  isBrowser!: boolean;

  constructor(
              private renderer: Renderer2,
              private el: ElementRef,
              @Inject(PLATFORM_ID) private platformId: Object)
  {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.applyScrollAnimation();
    }
  }

  applyScrollAnimation(): void {
    const container = document.querySelector('#main');
    const majors = Array.from(container!.querySelectorAll('.major')) as HTMLElement[];
    // Agregamos el evento de scroll al window
    this.renderer.listen(container, 'scroll', () => {
      majors.forEach((m: Element) => {
        const rect = m.getBoundingClientRect(); // Obtener las coordenadas del elemento
        const inView = rect.top <= window.innerHeight && rect.bottom >= 0; // Verificar si el elemento está en la vista

        if (inView) {
          // Si el elemento está en la vista, cambiamos el fondo a rojo
          this.renderer.addClass(m, 'visible');
        } else {
          // Si no está en la vista, restablecemos el fondo
          this.renderer.removeClass(m, 'visible');
        }
      });
    });
  }
}
