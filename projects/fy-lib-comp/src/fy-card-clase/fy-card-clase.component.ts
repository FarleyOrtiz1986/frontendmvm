import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptsService } from '../services/scripts.service';

@Component({
  selector: 'fy-card-clase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fy-card-clase.component.html',
  styleUrls: ['./fy-card-clase.component.css']
})
export class FyCardClaseComponent implements OnInit{

  private scriptSvc = inject(ScriptsService);
  
  @Input() textTitle: string | undefined;
  @Input() genero: string | undefined;
  @Input() textInfo: string | undefined;
  @Input() urlVideoExternal: string | undefined;
 

  @Output() eventVerClases: EventEmitter<any> = new EventEmitter();

  constructor() {  }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.scriptSvc.loadScript("assets/fy-lib-comp/js/fy-tooltips-js.js");
  }

  @Input() img: string | undefined;

  starVideo(){
    const urlVideo = "https://drive.google.com/file/d/"+ this.urlVideoExternal +"/preview"
    window.open(urlVideo, '_blank');
  }

}

