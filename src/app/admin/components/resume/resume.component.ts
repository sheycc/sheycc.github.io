import { Component } from '@angular/core';
import { NgIf } from "@angular/common";
import { finalize } from "rxjs";

import { AngularFireStorage } from "@angular/fire/compat/storage";

import { ResumeService } from "../../../shared/services/resume.service";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    NgIf,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {

  fileName: string = 'No file chosen';

  constructor(private resumeService: ResumeService) {}

  uploadFile(event: any) {
    this.fileName = 'Loading...';
    this.resumeService.uploadFile(event).then(
      (resumeURL) => {
        this.fileName = this.resumeService.fileName;
        resumeURL ? this.resumeService.resumeURL = resumeURL : this.resumeService.resumeURL = this.resumeService.byDefaultResume;
      }
    ).catch(
      error => {
        console.error('Error uploading file:', error);
        this.fileName = 'No file chosen';
      }
    );
  }

}
