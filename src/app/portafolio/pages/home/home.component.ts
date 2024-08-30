import {Component, inject, NgZone, OnInit, Renderer2} from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import { ResumeService } from "../../../shared/services/resume.service";
import { PrimengModule } from "../../../primeng/primeng.module";
import {AboutMeComponent} from "../../components/about-me/about-me.component";
import {SkillsComponent} from "../../components/skills/skills.component";
import {WorksComponent} from "../../components/works/works.component";
import {ContactComponent} from "../../components/contact/contact.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PrimengModule,
    AboutMeComponent,
    SkillsComponent,
    WorksComponent,
    ContactComponent
  ],
  providers: [ResumeService, MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private resumeService: ResumeService,
              private renderer: Renderer2,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.setupSmoothScrolling();
  }

  setupSmoothScrolling(): void {
    const menu = this.renderer.selectRootElement('#menu', true);
    const links = Array.from(menu.querySelectorAll('a')) as HTMLAnchorElement[];

    links.forEach((link: HTMLAnchorElement) => {
      this.renderer.listen(link, 'click', (e: Event) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')!.substring(1);
        if(targetId && targetId != 'admin/tabs') {
          const targetElement = this.renderer.selectRootElement(`#${targetId}`, true);

          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  async download() {
    await this.resumeService.download();
    this.confirm();
  }

  confirm() {
    this.messageService.add({key: 'resume', severity:'success', summary:'Message', detail:'Curriculum downloaded successfully!'});
    setTimeout(() => {
      this.messageService.clear();
    }, 2000);
  }
}
