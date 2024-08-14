import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent {

  @Input() title: string = 'Alert';
  @Input() message: string = 'This is an alert message.';
  isVisible: boolean = false;
  formattedMessage: string[] = [];

  constructor(private modalService: ModalService,) {

    this.modalService.modalVisibility.subscribe(isVisible => {
      this.isVisible = isVisible;
    });


    this.modalService.modalTitle.subscribe(title => {
      this.title = title;
    });

    this.modalService.modalMessage.subscribe(message => {
      this.message = message;
      this.formattedMessage = message.split('\n');
    });
  }


  show() {
    this.isVisible = true;
  }


  close() {
    this.isVisible = false;
    this.modalService.hideModal();
  }

  showError(title: string, message: string) {
    this.title = title;
    this.message = message;
    this.formattedMessage = message.split('\n');
    this.show();
  }
}
