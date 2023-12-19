import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fy-card-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fy-card-form.component.html',
  styleUrls: ['./fy-card-form.component.css']
})
export class FyCardFormComponent {

  @Input() fyClass: string | undefined ;

  constructor() { 
    this.fyClass = "fy-card-form";
  }

}
