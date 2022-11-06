import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // providers: [ModalService]
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() modalId: string = "";

  constructor(
    public modal: ModalService,
    public el: ElementRef
  ) {

  }

  ngOnInit(): void {
    // console.log(this.modal.isModalOpen());
    document.body.appendChild(this.el.nativeElement)
  }

  ngOnDestroy() {
    document.body.removeChild(this.el.nativeElement)
  }

  closeModal(): void {
    this.modal.toggleModal(this.modalId);
  }
}
