import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FyCardFormComponent } from "../../fy-card-form/fy-card-form.component";
import { FyLabelFormComponent } from "../../fy-label-form/fy-label-form.component";
import { FyErrorFormComponent } from "../../fy-error-form/fy-error-form.component";
import { FyInputComponent } from "../../fy-input/fy-input.component";
import { FyCheckboxComponent } from "../../fy-checkbox/fy-checkbox.component";
import { FyButtonComponent } from "../../fy-button/fy-button.component";

@Component({
    selector: 'fy-auth',
    standalone: true,
    templateUrl: './fy-auth.component.html',
    styleUrls: ['./fy-auth.component.css'],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, FyCardFormComponent, FyLabelFormComponent, FyErrorFormComponent, FyInputComponent, FyCheckboxComponent, FyButtonComponent]
})
export class FyAuthComponent implements OnInit  {

  @Input() title: string | undefined ;
  @Input() subTitle: string | undefined ;

  constructor(private fbForm: FormBuilder){}

  ngOnInit(): void { }

}
