import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptsService } from '../services/scripts.service';


@Component({
  selector: 'fy-card-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fy-card-course.component.html',
  styleUrls: ['./fy-card-course.component.css']
})
export class FyCardCourseComponent implements OnInit{

  private scriptSvc = inject(ScriptsService);
  
  @Input() textTitle: string | undefined;
  @Input() genero: string | undefined;
  @Input() textInfo: string | undefined;
  @Input() ncursos: string | undefined;
  @Input() curso: any[] | undefined;

  @Output() eventVerClases: EventEmitter<any> = new EventEmitter();

  constructor() {  }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.scriptSvc.loadScript("assets/fy-lib-comp/js/fy-tooltips-js.js");
  }

  @Input() img: string | undefined;

  starVideo(){
    this.eventVerClases.emit(this.curso);
  }

}
