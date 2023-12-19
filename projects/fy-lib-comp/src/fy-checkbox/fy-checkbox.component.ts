import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Provider, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';


const CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FyCheckboxComponent),
  multi: true,
};


@Component({
  selector: 'fy-checkbox',
  standalone: true,
  providers: [CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './fy-checkbox.component.html',
  styleUrls: ['./fy-checkbox.component.css']
})
export class FyCheckboxComponent implements ControlValueAccessor, OnInit {

  onChange: any = () => {};
  onTouch: any = () => {};
  @Input() checked: boolean = false;
  @Input() id: string = "";
  @Input() label: string = "";
  @Input() fyClass: string | undefined ;
  

  constructor() {
    this.fyClass = "fy-checkbox";
  }
  ngOnInit() {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(checked: boolean) {
    this.checked = checked;
  }

  onModelChange(e: boolean) {
    this.checked = e;
    this.onChange(e);
  }
}