import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  copyToClipboard(text: string) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Copied to clipboard: ' + text);
  }

}
