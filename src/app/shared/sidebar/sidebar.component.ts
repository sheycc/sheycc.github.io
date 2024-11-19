import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isSidebarInactive = true;

  constructor(private elementRef: ElementRef) { }

  toggleSidebar(event: Event) {
    event.preventDefault(); // Prevenir la acción por defecto del enlace
    this.isSidebarInactive = !this.isSidebarInactive;
  }

  @HostListener('document:click', ['$event'])
  closeSidebarOnClickOutside(event: Event): void {
    const sidebarElement = this.elementRef.nativeElement.querySelector('#sidebar');
    if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
      this.isSidebarInactive = true;
    }
  }
}
