import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversionsService {

  constructor() { }
  
  formatDateCrateUpdate(data: any){
    return data.map((item: { created_at: string | number | Date; updated_at: string | number | Date; }) => {
      const createdAtDate = new Date(item.created_at);
      const updatedAtDate = new Date(item.updated_at);
      return {
        ...item,
        created: createdAtDate,
        updated: updatedAtDate,
      };
    });
  }

}
