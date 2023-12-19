import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-float',
  templateUrl: './menu-float.component.html',
  styleUrls: ['./menu-float.component.css']
})
export class MenuFloatComponent implements OnInit {
  ngOnInit(): void {
   
  }

  @Output() eventGestionClientes: EventEmitter<any> = new EventEmitter();
  @Output() eventGestionAsesores: EventEmitter<any> = new EventEmitter();

  gestionClientes(){
    this.eventGestionClientes.emit();
  }

  gestionAsesores(){
    this.eventGestionAsesores.emit();
  }



}
