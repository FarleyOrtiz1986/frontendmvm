import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FyTooltipsComponent } from "../fy-tooltips/fy-tooltips.component";

@Component({
    selector: 'fy-card-date',
    standalone: true,
    encapsulation: ViewEncapsulation.Emulated,
    templateUrl: './fy-card-date.component.html',
    styleUrls: ['./fy-card-date.component.css'],
    imports: [CommonModule, FyTooltipsComponent]
})
export class FyCardDateComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() date: string| undefined;
  @Input() icon: string| undefined;

  @Output() eventToGo: EventEmitter<any> = new EventEmitter();

  constructor(){}
  ngOnInit(): void { }

  toGo(){ 
    this.eventToGo.emit();
  }

}
