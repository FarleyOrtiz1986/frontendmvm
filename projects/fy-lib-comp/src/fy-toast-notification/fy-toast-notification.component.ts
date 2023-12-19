import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptsService } from '../services/scripts.service';

@Component({
  selector: 'fy-toast-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fy-toast-notification.component.html',
  styleUrls: ['./fy-toast-notification.component.css']
})
export class FyToastNotificationComponent implements OnInit {
  
  private scriptSvc = inject(ScriptsService);

  @Input() typeToast: string | undefined;
  @Input() message: string | undefined;
  @Input() visible: boolean | undefined;
  icon: string | undefined;
  fyClass: string | undefined;
  private cont= 0;

  constructor() { 
    this.message = "";
    this.typeToast = "success"
    this.fyClass = "bg-success";
    this.icon = "check_circle";
    this.visible = false;
  }

  ngOnInit(): void {  
    this.scriptSvc.loadScript("assets/fy-lib-comp/js/fy-toast-notification.js");
  }

  
  ngOnChanges(changes: SimpleChanges): void { 
    if(this.cont > 0 ){
      this.openModal();
    }
    this.cont ++;

    this.openModal();
    if( this.typeToast === "success"){
      this.fyClass = "bg-success"
      this.icon = "check_circle";
    } else  
    if( this.typeToast == "danger") {
      this.fyClass = "bg-danger"
      this.icon = "error";
    } else  
    if( this.typeToast === "warning") {
      this.fyClass = "bg-warning"
      this.icon = "warning";
    } else  
    if( this.typeToast === "info") {
      this.fyClass = "bg-info"
      this.icon = "info";
    } 
  }

  openModal() {
    const toggleButton = document.getElementById("toastBtn") as HTMLElement;
    if (toggleButton) {
      toggleButton.click();
    }

  }

}
