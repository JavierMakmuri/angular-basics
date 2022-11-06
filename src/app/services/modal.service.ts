import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: IModal[] = [];

  constructor() { }

  public isModalOpen(id: string): boolean {
    return !!this.modals.find(x => x.id === id)?.visible
  }

  public toggleModal(id: string): void  {
    // let targetModal: IModal = this.modals.find(x => x.id === id);
    // let changedModal: IModal = {...targetModal, visible: !targetModal?.visible }
    // this.modals = this.modals.map(x => x.id === id ? changedModal : x)
    let modal = this.modals.find(x => x.id === id)

    if (modal) {
      modal.visible = !modal.visible
    }
  }
  
  public register(id: string) {
    this.modals = this.modals.concat({
      id,
      visible: false
    })
  }

  public unregister(id: string) {
    this.modals = this.modals.filter(x => x.id !== id)
  }
}
