import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from "../shared-components/badge/badge.component";
import { UserDropdownNabvarComponent } from "../shared-components/user-dropdown-nabvar/user-dropdown-nabvar.component";

@Component({
    selector: 'fy-navbar',
    standalone: true,
    encapsulation: ViewEncapsulation.Emulated,
    templateUrl: './fy-navbar.component.html',
    styleUrls: ['./fy-navbar.component.css'],
    imports: [CommonModule, BadgeComponent, UserDropdownNabvarComponent]
})
export class FyNavbarComponent implements OnInit {
  @Input() fyClassBadge: string| undefined;
  @Input() textEstate: string| undefined;
  @Input() name: string| undefined;
  @Input() imgProfile: string| undefined;
  @Input() typeUser: string| undefined;
  @Input() showMenuVisible: boolean| undefined;
  @Input() currentPage: string| undefined;
  
  
  @Output() goToLogoutEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() goToProfileEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() showMenuEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(){
    this.currentPage = "inicio";
    this.typeUser = "User";  //AdminSingle
    this.showMenuVisible = false;
  }

  ngOnInit(): void {}

  goToLogout(){
    this.goToLogoutEventEmitter.emit();
  }
  goToProfile(){
    this.goToProfileEventEmitter.emit()
  }

  showMenu(){
    this.showMenuEventEmitter.emit()
  }

}
