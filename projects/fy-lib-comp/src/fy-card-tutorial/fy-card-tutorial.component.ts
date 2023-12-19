import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptsService } from '../services/scripts.service';

@Component({
  selector: 'fy-card-tutorial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fy-card-tutorial.component.html',
  styleUrls: ['./fy-card-tutorial.component.css']
})
export class FyCardTutorialComponent implements OnInit{

  private scriptSvc = inject(ScriptsService);
  
  @Input() textTitle: string | undefined;
  @Input() genero: string | undefined;
  @Input() textInfo: string | undefined;
  @Input() min: string | undefined;
  @Input() urlVideoExternal: string | undefined;
  

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

