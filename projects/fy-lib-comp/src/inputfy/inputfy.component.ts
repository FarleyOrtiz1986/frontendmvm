










import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit, Provider, SimpleChanges, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';

const CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputfyComponent),
  multi: true,
};
import { SpinnerInputComponent } from "../shared-components/spinner-input/spinner-input.component";

@Component({
  selector: 'inputfy',
    standalone: true,
    providers: [CONTROL_VALUE_ACCESSOR],
    templateUrl: './inputfy.component.html',
  styleUrls: ['./inputfy.component.css'],
    imports: [CommonModule,  FormsModule, ReactiveFormsModule, SpinnerInputComponent]
})
export class InputfyComponent  implements OnInit, ControlValueAccessor {
  ngOnInit(): void {
   
  }

  @HostListener('change', ['$event.target.files']) onChange = (_: any) => { };
  @HostListener('blur') onTouched = () => { };

  // writeValue(value: any) { }
  // registerOnChange(fn: (_: any) => void) { this.onChange = fn; }
  // registerOnTouched(fn: () => void) { this.onTouched = fn; }
  
     @Input() type: string | undefined;
     @Input() placeholder: string | undefined ;
     @Input() id: string | undefined;
     @Input() fyClass: string | undefined ;
     @Input() value: any;
     @Input() downloadOk : boolean | undefined ;

  //   showPassword = false; 
  //   typePassword = false;
    
  //   onChange: any = () => {};
  //   onTouched: any = () => {};
      
  //   constructor() { 
  //     this.type = "text";
  //     this.placeholder = ""
  //     this.fyClass = "form-control";
  //     this.downloadOk  = true;
  //   }
  
  //   ngOnInit(): void { 
  //     if(this.type == "password"){this.typePassword = true}
  //   }
  //   ngOnChanges(changes: SimpleChanges): void { 
  //     if(this.type == "password"){this.typePassword = true}
  //   }
  
     registerOnChange(fn: any): void { this.onChange = fn; }
     registerOnTouched(fn: any): void { this.onTouched = fn; }
     writeValue(obj: any): void {
        this.value = obj; 
       }
 
  // togglePasswordVisibility() {
  //   this.showPassword = !this.showPassword;
  // }

  }
