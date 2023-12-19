import { Component, Input, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptsService } from '../services/scripts.service';

@Component({
  selector: 'fy-sidebar',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [CommonModule],
  templateUrl: './fy-sidebar.component.html',
  styleUrls: ['./fy-sidebar.component.css']
})
export class FySidebarComponent implements OnInit {

  @Input() menuData: any[] | undefined;
 
  @Input() logoLong: string | undefined;
   @Input() logoShort: string | undefined;
  
  
  private scriptSvc = inject(ScriptsService);

  constructor() {  }

  ngOnInit(): void {  
    //this.scriptSvc.loadScript("assets/fy-lib-comp/js/fy-sidebar.js");
  }

 
}
