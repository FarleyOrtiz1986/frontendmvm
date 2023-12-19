import { Injectable, SecurityContext } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FyFileManagerService {

  fileURL: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) { }

  getUrlPdf(data: any) {
    const file = new Blob([data], { type: 'application/pdf' });
    const unsafeURL = URL.createObjectURL(file);
    this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeURL);
    return this.fileURL;
  }

  downloadPdf(fileURL: SafeResourceUrl, nombreArchivo: string) {
    if (fileURL) {
      const realUrl = this.sanitizer.sanitize(SecurityContext.URL, fileURL);
      if (realUrl) {
        const a = document.createElement('a');
        a.href = realUrl;
        a.download = nombreArchivo+'.pdf'; // Puedes cambiar el nombre del archivo aquí
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  }

  createTxtOfAArray(arrayStrings : any, nameFile: string) {
    const content = arrayStrings.join('\n'); // Separar cada string con un salto de línea
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, nameFile+'.txt');
  }

}
