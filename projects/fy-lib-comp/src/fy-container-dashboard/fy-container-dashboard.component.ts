import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptsService } from '../services/scripts.service';
import { FySidebarComponent } from "../fy-sidebar/fy-sidebar.component";
import { BadgeComponent } from "../shared-components/badge/badge.component";
import { FyNavbarComponent } from "../fy-navbar/fy-navbar.component";
import { FyCardDateComponent } from "../fy-card-date/fy-card-date.component";

@Component({
    selector: 'fy-container-dashboard',
    standalone: true,
    templateUrl: './fy-container-dashboard.component.html',
    styleUrls: ['./fy-container-dashboard.component.css'],
    imports: [CommonModule, FySidebarComponent, BadgeComponent, FyNavbarComponent, FyCardDateComponent]
})
export class FyContainerDashboardComponent implements OnInit, AfterViewInit {

  @Input() menuData: any[] | undefined;
  @Input() estate: string| undefined;
  @Input() name: string| undefined;
  @Input() imgProfile: string| undefined;
  
  @Output() goToLogoutEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() goToProfileEventEmitter: EventEmitter<any> = new EventEmitter();
  
  
  private scriptSvc = inject(ScriptsService);

  constructor() {  }
  ngAfterViewInit(): void {
    this.scriptSvc.loadScript("assets/fy-lib-comp/js/fy-js.js");
  }

  ngOnInit(): void {  
    // this.scriptSvc.loadScript("assets/fy-lib-comp/js/fy-js.js");
  }

  
 

  goToLogout(){
    this.goToLogoutEventEmitter.emit();
  }
  goToProfile(){
    this.goToProfileEventEmitter.emit()
  }

  
 
}
