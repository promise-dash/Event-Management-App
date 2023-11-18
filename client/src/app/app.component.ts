import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  
  binaryData = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
  base64Data = btoa(String.fromCharCode(...this.binaryData));
}
