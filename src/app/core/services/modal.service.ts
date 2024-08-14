import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalVisibilitySource = new BehaviorSubject<boolean>(false);
  modalVisibility = this.modalVisibilitySource.asObservable();

  private modalTitleSource = new BehaviorSubject<string>('Alert');
  modalTitle = this.modalTitleSource.asObservable();

  private modalMessageSource = new BehaviorSubject<string>('This is an alert message.');
  modalMessage = this.modalMessageSource.asObservable();

  private errorMessages: { [key: number]: string } = {
    401: 'Você não tem permissão ou não está logado.',
    503: 'Serviço offline ou em manutenção, tente novamente mais tarde.',
  };

  getErrorMessage(statusCode: number): string {
    return this.errorMessages[statusCode] || 'Ocorreu um erro desconhecido, atualize a página ou tente novamente mais tarde!';
  }

  showError(error: number | string) {
    let errorMessage: string;

    if (typeof error === 'number') {
      errorMessage = this.getErrorMessage(error);

    } else {
      errorMessage = error;

    }
    this.modalTitleSource.next('Erro');
    this.modalMessageSource.next(errorMessage);
    this.modalVisibilitySource.next(true);
  }

  hideModal() {
    this.modalVisibilitySource.next(false);
  }
}
