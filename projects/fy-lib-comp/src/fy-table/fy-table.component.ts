import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { FyInputComponent } from "../fy-input/fy-input.component";
import { FormsModule } from '@angular/forms';
import { FyCheckboxComponent } from 'fy-lib-comp';
import { FyAccessConstantsService } from 'projects/fy-services/src/acces-conts/fy-access-constants.service';
import { FyButtonIconComponent } from "../fy-button-icon/fy-button-icon.component";
import { BadgeComponent } from '../shared-components/badge/badge.component';
import * as  XLSX from 'xlsx';
import { ToastNotificationService } from '../services/toast-notification.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'fy-table',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './fy-table.component.html',
  styleUrls: ['./fy-table.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ]),
  ],
  imports: [CommonModule, BrowserAnimationsModule , TagModule, DropdownModule, MultiSelectModule, TableModule, FormsModule, FyInputComponent, FyCheckboxComponent, FyButtonIconComponent, BadgeComponent]
})
export class FyTableComponent implements OnInit {

  accesConst = inject(FyAccessConstantsService);
  toastNotSvc = inject(ToastNotificationService);

  @Input() objects: any[] | undefined; //Lista de objetos que recibira los datos (any_ para recibir objetos independiente del tipo)
  @Input() value_id: string | undefined; //Valor que servira como id de la tabla, o un campo de valores unicos
  @Input() cols: any[] | undefined; //Recibe las columnas que mostrara la tabla y los campos asociados a dicha tabla
  @Input() selectionMode: string = 'single';  //Permite la seleccion multiple de los campos
  @Input() SelectionSheckbox: boolean = false;  //Permite la seleccion multiple de los campos

  @Input() scrollable: boolean = true; //Permite la confirmación de scroll
  @Input() rows: number = 8; //Inidica el numero de filas que se veran por pagina
  @Input() paginator: boolean = true; //Afirma si se quiere o no la paginacion
  @Input() rowsPerPageOptions: any[] = [30, 50, 80, 100]; //Indica las opciones de elementos por pagina
  @Input() downloadObjectsOK: boolean = false; //Inidica si cargo o no la totalidad de datos
  @Input() exportInExcel: boolean = false; //Permite habiltar la opcion de importacion de datos desde exel
  @Input() importExcel: boolean = false; //Permite habiltar la opcion de importacion de datos desde exel
  @Input() newElement: boolean = false; //Permite habiltar la opcion de importacion de datos desde exel
  @Input() edit: boolean = false; //Permite la edicion o no de las columnas
  @Input() title: string = ""; //Permite la edicion o no de las columnas
  @Input() visibleTable: boolean = true; //Permite la edicion o no de las columnas
 
  


  @Input() headerSearch: boolean = true; //Permite la edicion o no de las columnas
  @Input() Headerfilter: boolean = true; //Permite la edicion o no de las columnas
  
  @Input() update: boolean = false; //Permite la edicion o no de las columnas

  @Input() deletee: boolean = false; //Permite la edicion o no de las columnas
  @Input() active: boolean = false; //Permite la edicion o no de las columnas
  @Input() more: boolean = false; //Permite la edicion o no de las columnas
  @Input() plus: boolean = false; //Permite la edicion o no de las columnas

  @Input() colFixed: boolean = false; //Permite fijar la columna

  @Output() eventIsRowSelectable: EventEmitter<any> = new EventEmitter();
  @Output() eventMore: EventEmitter<any> = new EventEmitter();
  @Output() eventPlus: EventEmitter<any> = new EventEmitter();
  @Output() eventActive: EventEmitter<any> = new EventEmitter();
  @Output() eventDelete: EventEmitter<any> = new EventEmitter();
  @Output() eventUpdate: EventEmitter<any> = new EventEmitter();
  
  @Output() eventImportExcel: EventEmitter<any> = new EventEmitter();
  @Output() eventNewElement: EventEmitter<any> = new EventEmitter();
  @Output() eventUseSelection: EventEmitter<any> = new EventEmitter();
  @Output() eventModifySelection: EventEmitter<any> = new EventEmitter();
 

  useSelection(){
    this.eventUseSelection.emit(this.selectedObjects);
  }


  // modifySelection(){
  //   this.eventModifySelection.emit(this.selectedObjects);
  // }
  

  itemsMenu: MenuItem[] | undefined;
  itemsSubMenu: MenuItem[] | undefined;
  clonedProducts: { [s: string]: any } = {};
  ikeyword: string = "";

  text = this.accesConst.typeField.text;
  number = this.accesConst.typeField.number;
  boolean = this.accesConst.typeField.boolean;
  date = this.accesConst.typeField.date;
  date_hour = this.accesConst.typeField.date_hour;
  time = this.accesConst.typeField.time;
  percentage = this.accesConst.typeField.percentage;
  select = this.accesConst.typeField.select;
  currency_usd = this.accesConst.typeField.currency_usd;
  currency_cop = this.accesConst.typeField.currency_cop;
  img_profile = this.accesConst.typeField.imgProfile;
  finit_options = this.accesConst.typeField.finit_options;

  _selectedColumns: any[] | undefined;
  @Input()  selectedObjects: any[] | undefined;
  metaKeySelection: boolean = true;


 
  constructor(private elementRef: ElementRef) {
    this.rows = this.rowsPerPageOptions[0];
    this.title = "";
    this.selectedObjects = []
  
  }

  ngOnInit(): void {
    if(this.visibleTable){
      this.paginator = true;
    } else {
      this.paginator = false;
    }
  }





  clickVisibleTable(){
    this.visibleTable = !this.visibleTable
    if(this.visibleTable){
      this.paginator = true;
    } else {
      this.paginator = false;
    }
  }


  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.cols) {
      this._selectedColumns = this.cols;
    }
    if(this.visibleTable){
      this.visibleTable=false;
      setTimeout(() => {
        this.visibleTable=true;
      }, 50);
      this.paginator = true;
    } else {
      this.paginator = false;
    }
 
  }

  @Input() get selectedColumns(): any {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols!.filter((col) => val.includes(col));
  }

  clear(table: Table) {
    table.clear();
  }

  filterSearch(table: Table) {
    table.filterGlobal(this.ikeyword, 'contains');
  }



  onRowSelect(object: any) {
    this.eventIsRowSelectable.emit(object.data);
  }

  onRowUnselect(object: any) {
    this.eventIsRowSelectable.emit(object.data);
  }

  moreEvents(object: any) {
    this.eventMore.emit(object);
  }

  plusEvents(object: any) {
    this.eventPlus.emit(object);
  }

  activeEvents(object: any) {
    this.eventActive.emit(object);
  }

  deleteEvents(object: any) {
    this.eventDelete.emit(object);
  }

  updateEvents(object: any) {
    this.eventUpdate.emit(object);
  }


  clickInImport() {
    const fileInputElement = this.elementRef.nativeElement.querySelector('#file-input');
    fileInputElement.value = '';
    const labelElement = this.elementRef.nativeElement.querySelector('.file-input-label');
    labelElement.click();
  }

  clickInNewElement(){
    this.eventNewElement.emit();
  }

  /**
   * @description Permite leer los datos de un archivo de excel y pasarlo al padre
   * @param event 
   */
  readExcel(event: any) {
    var ExcelData;
    let file = event.target.files[0];
    // Validar si es un archivo de Excel por su extensión
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      this.toastNotSvc.activateToastNotification("warning", "Por favor, seleccione un archivo de Excel válido.")
      return;
    }
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      var SheetNames = workbook.SheetNames;
      ExcelData = XLSX.utils.sheet_to_json(workbook.Sheets[SheetNames[0]]);

      if (ExcelData == undefined || ExcelData == null) {
        this.toastNotSvc.activateToastNotification("warning", "Los datos no se lograron convertir al formato necesario para ser cargados a la base de datos, valide el formato de los datos de la tabla.")
        return;
      }

      if (ExcelData.length === 0) {
        this.toastNotSvc.activateToastNotification("warning", "El archivo de Excel está vacío. Por favor, asegúrese de que contenga datos.")
        return;
      }
      this.eventImportExcel.emit(ExcelData)
    }
  }

  getSeverity(representative: any, field: string, option_label: string, option_status: string) {
    for (const element of representative) {
      if (field == element[option_label]) {
        return element[option_status];
      }
    }
    return "info";
  }


}
