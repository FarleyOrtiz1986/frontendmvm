import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptsService } from '../services/scripts.service';

@Component({
  selector: 'fy-card-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fy-card-profile.component.html',
  styleUrls: ['./fy-card-profile.component.css']
})
export class FyCardProfileComponent implements OnInit {

    @Input() object: any | undefined;
    @Input() placeholder: string | undefined ;
    @Input() id: string | undefined;
    @Input() fyClass: string | undefined ;
    @Input() value: any;
    @Input() downloadOk : boolean | undefined ;

    

  constructor() { }

  ngOnInit(): void {  
  }

  masVisible = false;
 

}
