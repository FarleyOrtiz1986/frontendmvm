
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Provider, SimpleChanges, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';

const CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FyInputComponent),
  multi: true,
};
import { SpinnerInputComponent } from "../shared-components/spinner-input/spinner-input.component";

@Component({
    selector: 'fy-input',
    standalone: true,
    providers: [CONTROL_VALUE_ACCESSOR],
    templateUrl: './fy-input.component.html',
    styleUrls: ['./fy-input.component.css'],
    imports: [CommonModule,  FormsModule, ReactiveFormsModule, SpinnerInputComponent]
})
export class FyInputComponent  implements OnInit, ControlValueAccessor {


    @Input() type: string | undefined;
    @Input() placeholder: string | undefined ;
    @Input() id: string | undefined;
    @Input() fyClass: string | undefined ;
    @Input() value: any;
    @Input() downloadOk : boolean | undefined ;

    showPassword = false; // Variable para rastrear la visibilidad de la contraseña
    typePassword = false;
    
    onChange: any = () => {};
    onTouched: any = () => {};
      
    constructor() { 
      this.type = "text";
      this.placeholder = ""
      this.fyClass = "form-control";
      this.downloadOk  = true;
    }
  
    ngOnInit(): void { 
      if(this.type == "password"){this.typePassword = true}
    }
    ngOnChanges(changes: SimpleChanges): void { 
      if(this.type == "password"){this.typePassword = true}
    }
  
    /** Funciones ControlValueAccessor que permiten funcionalidad en el formulario reactivo */
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    //setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
    writeValue(obj: any): void {
       this.value = obj; 
      }
  
    // Agrega cualquier otra lógica o funciones relevantes para el componente de input
     // Función para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  }
