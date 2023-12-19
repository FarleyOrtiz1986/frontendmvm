import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FyButtonComponent } from "../fy-button/fy-button.component";
import { BadgeComponent } from "../shared-components/badge/badge.component";

@Component({
    selector: 'fy-card-info-generic',
    standalone: true,
    templateUrl: './fy-card-info-generic.component.html',
    styleUrls: ['./fy-card-info-generic.component.css'],
    imports: [CommonModule, FyButtonComponent, BadgeComponent]
})
export class FyCardInfoGenericComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() imgCardInfoGeneric: string | undefined;
  @Input() cantidadLicencias: string | undefined;
  @Input() cantidadLicenciasCongeladas: string | undefined;
  
  @Input() message: string | undefined;

  @Input() fechaInicial: string | undefined;
  @Input() fechaFinal: string | undefined;

  @Input() fyClassBadge: string | undefined;
  @Input() textEstateBadge: string | undefined;
  
  
  
  
  
  @Input() date: string| undefined;
  @Input() icon: string| undefined;

  constructor(){
    this.message = ""
  }
  ngOnInit(): void { 
   
  }
 

}