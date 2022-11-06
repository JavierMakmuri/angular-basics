import { Component, OnInit, OnDestroy, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { ClipService } from 'src/app/services/clip.service';
 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;

  @Output() update = new EventEmitter();

  inSubmission: boolean = false
  showAlert: boolean = false
  alertColor: string = 'blue' 
  alertMsg: string = 'Please wait! Updating clip.'

  constructor(
    private modalService: ModalService,
    private clipService: ClipService
  ) { }

  ngOnInit(): void {
    this.modalService.register('editClip')
  }

  ngOnDestroy(): void {
    this.modalService.unregister('editClip')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip) {
      return
    }

    this.inSubmission = false
    this.showAlert = false
    this.clipId.setValue(this.activeClip.docID as string)
    this.title.setValue(this.activeClip.title)
  }

  // Form Controls
  clipId = new FormControl('', {
    nonNullable: true
  })
  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  // Form Group
  editForm = new FormGroup({
    title: this.title
  })

  async submit() {
    this.inSubmission = true
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Updating clip.';

    try {
      await this.clipService.updateClip(this.clipId.value, this.title.value)
    }
    catch(e) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'Something went wrong. Try again later'
      return
    }

    (this.activeClip as IClip).title = this.title.value 
    this.update.emit(this.activeClip);

    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMsg = 'Success!'
  }
}
