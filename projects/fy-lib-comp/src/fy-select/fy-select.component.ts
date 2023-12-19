import {  Component,  EventEmitter,  Input, OnInit,  Output,  Provider, SimpleChanges, ViewEncapsulation, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import {  NgSelectConfig } from '@ng-select/ng-select';
import { NgSelectModule } from '@ng-select/ng-select';

const CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FySelectComponent),
  multi: true,
};

@Component({
  selector: 'fy-select',
  standalone: true,
  providers: [CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './fy-select.component.html',
  styleUrls: ['./fy-select.component.css']
})
export class FySelectComponent  implements OnInit , ControlValueAccessor  { 

  @Output() eventSelectedObject: EventEmitter<any> = new EventEmitter();

  @Input() multiple: boolean | undefined;
  @Input() items: any[] | undefined;
  @Input() bindValue : string |number| undefined;
  @Input() bindLabel: string | undefined;
  downloadOk : boolean = false;
 
  @Input() value: any | undefined;
  onChange = (_any: any) => {};
  onTouched = (_any: any) => {};
  touched = false;
  isDisabled = false;

  compareObjects(obj1: any, obj2: any): boolean {
    // Comparar los objetos por alguna propiedad única que los identifique, por ejemplo, su ID
    return obj1 && obj2 &&   obj1[this.bindValue!]  === obj2[this.bindValue!] ;
  }
 
  constructor(private config: NgSelectConfig){  this.config.notFoundText = 'Sin datos'; }
  ngOnInit(): void { 
    this.downloadOk = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.downloadOk = true;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void { this.isDisabled = isDisabled; }
  writeValue(obj: any): void {
    this.value = obj; 
  }

  emitSelectionChanged(event: object) {
    console.log(event);
    this.value = event;
    this.onChange(event);
    this.eventSelectedObject.emit(event);
  }

}
