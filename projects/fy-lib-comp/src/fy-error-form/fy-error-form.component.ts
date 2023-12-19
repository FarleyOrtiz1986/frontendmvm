import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrors } from '@angular/forms';

interface KeyValuePair {
  key: string;
  value: string;
}

@Component({
  selector: 'fy-error-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fy-error-form.component.html',
  styleUrls: ['./fy-error-form.component.css']
})
export class FyErrorFormComponent implements OnInit {

  @Input() visible: boolean | undefined;
  @Input() fyClass: string | undefined;
  @Input() errors: ValidationErrors | null | undefined;

  validationMessagesArray: KeyValuePair[] = [];
  message: string = "";

  validationMessages: { [key: string]: string } = {
    required: 'Este campo es requerido.',
    email: 'El formato es inválido.',
    maxlength: 'Supera el maximo de caracteres permitidos ',
    minlength: 'La cantidad minima de caracteres permitidos es ',
    min: 'El campo debe ser mayor o igual que ',
    pattern: 'Valide el formato del campo'
    // Agrega más mensajes de error personalizados según tus necesidades
  };

  constructor() {
    this.fyClass = 'form-text text-danger mt-0';
    this.visible = false;
  }

  ngOnInit(): void {
    this.errorHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.errorHandler();
  }

  private errorHandler() {
    this.validationMessagesArray = Object.entries(this.validationMessages).map(([key, value]) => ({ key, value }));
    this.message = '';
    for (const key in this.errors) {
      if (this.errors.hasOwnProperty(key) && this.validationMessages.hasOwnProperty(key)) {
        this.message += this.validationMessages[key] + ' ';
        if (key == 'maxlength') {
          this.message += " (" + this.errors['maxlength'].requiredLength + ")";
        }
        if (key == 'minlength') {
          this.message += " (" + this.errors['minlength'].requiredLength + ")";
        }
        if (key == 'min') {
          this.message += " (" + (this.errors['min'].min) + ")";
        }
        return;
      }
    }
  }

}
