import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from "../badge/badge.component";

@Component({
    selector: 'user-dropdown-nabvar',
    standalone: true,
    templateUrl: './user-dropdown-nabvar.component.html',
    styleUrls: ['./user-dropdown-nabvar.component.css'],
    imports: [CommonModule, BadgeComponent]
})
export class UserDropdownNabvarComponent  implements OnInit{
  
  @Input() fyClassBadge: string| undefined;
  @Input() textEstate: string| undefined;
  
  @Input() name: string| undefined;
  @Input() imgProfile: string| undefined;
  @Input() typeUser: string| undefined;
  
  
  @Output() goToLogoutEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() goToProfileEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(){ 
    this.typeUser = "User";  //AdminSingle
  }

  ngOnInit(): void {}

  goToLogout(){
    this.goToLogoutEventEmitter.emit();
    
  }
  goToProfile(){
    this.goToProfileEventEmitter.emit();
  }

}
