import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent  implements OnInit {

  @Input() fyClass: string | undefined;
  @Input() textEstate: string | undefined;
  
  constructor() { 
    this.fyClass = "bg-success"
    this.textEstate =  "";  
  }

  ngOnInit(): void {  }

  // calculateClassEstate(){
  //   var classEstate = ""
  //   if(this.estate == "Activo"){
  //     classEstate = "estate badge bg-success"
  //   }
  //   return classEstate;
  // }
}