import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Provider, SimpleChanges, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';

const CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FyTextareaComponent),
  multi: true,
};
import { SpinnerInputComponent } from "../shared-components/spinner-input/spinner-input.component";
@Component({
  selector: 'fy-textarea',
  standalone: true,
  providers: [CONTROL_VALUE_ACCESSOR],
  templateUrl: './fy-textarea.component.html',
  styleUrls: ['./fy-textarea.component.css'],
  imports: [CommonModule,  FormsModule, ReactiveFormsModule, SpinnerInputComponent]
})
export class FyTextareaComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string | undefined ;
  @Input() id: string | undefined;
  @Input() fyClass: string | undefined ;
  @Input() value: any;
  @Input() downloadOk : boolean | undefined ;
  
  onChange: any = () => {};
  onTouched: any = () => {};
    
  constructor() { 
    this.placeholder = ""
    this.fyClass = "form-control";
    this.downloadOk  = true;
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void { }

  /** Funciones ControlValueAccessor que permiten funcionalidad en el formulario reactivo */
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  //setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
  writeValue(obj: any): void {
     this.value = obj; 
    }
}
