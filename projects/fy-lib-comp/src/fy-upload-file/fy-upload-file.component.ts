import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptsService } from '../services/scripts.service';
import { ToastNotificationService } from '../services/toast-notification.service';

@Component({
  selector: 'fy-upload-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fy-upload-file.component.html',
  styleUrls: ['./fy-upload-file.component.css']
})
export class FyUploadFileComponent implements OnInit {

  @Input() id: string | undefined;
  @Input() allowedExtensions: string[] | undefined;
  @Input() megas: number | undefined;
  name: string = "hola";
  iconRemove = false;

  @Output() eventFile: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;

  toastNotSvc = inject(ToastNotificationService);

  constructor() {
    this.allowedExtensions = ['pdf', 'doc', 'jpg', 'png'];
    this.megas = 2;
  }
  ngAfterViewInit(): void { 
    console.log("ngAfterViewInit")
  }
  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges")
    console.log(changes)
  }



  file: any;

  onChange(event: any) {
  
     this.file = event.target.files[0];
    if (this.file) {
      const fileName: string = this.file.name;
      const fileExtension: string = fileName.split('.').pop()!;
      const allowedExtensions = this.allowedExtensions;
      if (!allowedExtensions!.includes(fileExtension)) {
        this.fileInput!.nativeElement.value = '';
        this.toastNotSvc.activateToastNotification("danger", "Archivo no valido");
        return;
      }
      const maxSizeInBytes = this.megas! * 1024 * 1024; // 2 megabytes
      if (this.file.size > maxSizeInBytes) {
        this.fileInput!.nativeElement.value = '';
        this.toastNotSvc.activateToastNotification("danger", "Tamaño del archivo excede el límite");
        return;
      }
      this.name = fileName;
      this.name = this.name.slice(0, -4);
      if (this.name.length > 17) {
        this.name = this.name.slice(0, 17);
        this.name = this.name + "... ";
      }
      this.name = this.name + "." + fileExtension;
      // this.fileInput!.nativeElement.value = '';
      this.iconRemove = true;
      console.log("cargue el archivivo " +  this.name);
      let foot = {} as filee;
      foot.id = "hlis";
      foot.padre_id = this.file;
       this.eventFile.emit(this.file);
      //this.eventFile.next(file)
     
    }

   
  }

  

 

  removeFile(){
    this.iconRemove = false;
    this.name = "";
    this.fileInput!.nativeElement.value = '';
    this.eventFile.emit(undefined);
  }


}

export interface filee{
  id: string ;
  padre_id: any;
}