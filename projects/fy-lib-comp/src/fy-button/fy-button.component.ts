import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fy-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fy-button.component.html',
  styleUrls: ['./fy-button.component.css']
})
export class FyButtonComponent implements OnInit {

  @Input() type: string | undefined;
  @Input() fyClass: string | undefined;

  constructor() { 
    this.fyClass = "btn btn-success "
  }

  ngOnInit(): void {
  }

}
