import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fy-button-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fy-button-icon.component.html',
  styleUrls: ['./fy-button-icon.component.css']
})
export class FyButtonIconComponent implements OnInit {
  @Input() icon: string | undefined;
  @Input() fyClass: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
