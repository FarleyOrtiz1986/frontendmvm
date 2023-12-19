import { Component, Input, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptsService } from '../services/scripts.service';

@Component({
  selector: 'fy-tooltips',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [CommonModule],
  templateUrl: './fy-tooltips.component.html',
  styleUrls: ['./fy-tooltips.component.css']
})
export class FyTooltipsComponent implements OnInit {

  @Input() text: string | undefined;
  @Input() icon: string| undefined;
  @Input() fyClass: string| undefined;
  @Input() typeTooltips: string| undefined;

  
  
  private scriptSvc = inject(ScriptsService);

  constructor() {  }
  ngAfterViewInit(): void {
    this.scriptSvc.loadScript("assets/fy-lib-comp/js/fy-tooltips-js.js");
  }

  ngOnInit(): void { }
  
  
  }
  



