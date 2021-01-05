import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: any[] = [];

  add(modal: any) {
      this.modals.push(modal);
  }

  open(id: string) {
      const modal = this.modals.find(x => x.id === id);
      modal.open();
  }

  close(id: string) {
      const modal = this.modals.find(x => x.id === id);
      modal.close();
  }
}
