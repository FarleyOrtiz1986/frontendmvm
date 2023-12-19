import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FyCardFormComponent } from "../../fy-card-form/fy-card-form.component";
import { FyLabelFormComponent } from "../../fy-label-form/fy-label-form.component";
import { FyErrorFormComponent } from "../../fy-error-form/fy-error-form.component";
import { FyInputComponent } from "../../fy-input/fy-input.component";
import { FyCheckboxComponent } from "../../fy-checkbox/fy-checkbox.component";
import { FyButtonComponent } from "../../fy-button/fy-button.component";
import { environment } from '../../assets/environments/environment';
import { FyModalComponent } from "../../fy-modal/fy-modal.component";
import { FyCardProfileComponent } from '../../public-api';
import { FyToastNotificationComponent } from "../../fy-toast-notification/fy-toast-notification.component";
import { FyTableComponent } from "../../fy-table/fy-table.component";

@Component({
    selector: 'fy-register',
    standalone: true,
    templateUrl: './fy-register.component.html',
    styleUrls: ['./fy-register.component.css'],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, FyCardFormComponent, FyLabelFormComponent, FyErrorFormComponent, FyInputComponent, FyCheckboxComponent, FyButtonComponent, FyModalComponent, FyCardProfileComponent, FyToastNotificationComponent, FyTableComponent]
})
export class FyRegisterComponent implements OnInit  {

  @Output() eventAuth: EventEmitter<any> = new EventEmitter();
 
  form!: FormGroup; // Gestion del formulario 
  submitedForm = false;  // Gestion del formulario 

  isEmail = environment.regular_expres_email

  visible = false;
  visibleToast = false;

  constructor(private fbForm: FormBuilder){
    this.initForm();
  }



  clickVisible(){
    this.visible = !this.visible;
  }

  ngOnInit(): void { }

  initForm() {
    this.form = this.fbForm.group({
      email: ['', Validators.compose([Validators.required, Validators.maxLength(400), Validators.pattern(this.isEmail)])],
      password: ['', Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(20)])],
      policies: [false, Validators.compose([Validators.requiredTrue])],
    });
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get policies() { return this.form.get('policies'); }

  actionForm(){
    if (this.form.invalid) {
      this.submitedForm = true;
      return;
    }
    this.eventAuth.emit(
      {
        email: this.email?.value,
        password: this.password?.value
      }
    );

  }

}
