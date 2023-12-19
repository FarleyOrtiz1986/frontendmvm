import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'fy-modal',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, ButtonModule, DialogModule],
  templateUrl: './fy-modal.component.html',
  styleUrls: ['./fy-modal.component.css']
})
export class FyModalComponent implements OnInit {

  @Input() visible: boolean | undefined;
  @Input() fy_size: string | undefined;
  @Input() fy_trans: boolean | undefined;
  @Input() title: string | undefined;
  @Input() id: string | undefined;
  @Input() widthInit: string | undefined;
  private cont= 0;

  

  @Output() eventOpenModal: EventEmitter<any> = new EventEmitter();
  @Output() eventCloseModal: EventEmitter<any> = new EventEmitter();

  constructor(){
    this.visible = false;
    this.title = "";
    this.fy_size = "";
    this.fy_trans = false;
    this.widthInit = "75vw";
  }

  ngOnInit(): void { }

  openModal() { this.eventOpenModal.emit(undefined); }
  closeModal() { this.eventCloseModal.emit(undefined); }


 

  ngOnChanges(changes: SimpleChanges): void { 
    // if(this.cont > 0 ){
    //   this.openModal();
    // }
    // this.cont ++;
  }

  // openModal() {
  //   const toggleButton = document.getElementById(this.id!) as HTMLElement;
  //   if (toggleButton) {
  //     toggleButton.click();
  //   }
  // }

  // closeModal() {
  //   const toggleButton = document.getElementById("close") as HTMLElement;
  //   if (toggleButton) {
  //     toggleButton.click();
  //   }
  // }

 

}
