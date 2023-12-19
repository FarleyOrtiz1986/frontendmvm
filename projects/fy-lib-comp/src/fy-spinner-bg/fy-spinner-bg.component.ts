import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fy-spinner-bg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fy-spinner-bg.component.html',
  styleUrls: ['./fy-spinner-bg.component.css']
})
export class FySpinnerBgComponent implements OnInit {
  

  @Input() messageSpinnerBg: string | undefined;

  constructor() {     
    this.messageSpinnerBg = "Cargando ...";
  }

  ngOnInit(): void {   }
  ngOnChanges(changes: SimpleChanges): void {  }

}


