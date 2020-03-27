import {Component, TemplateRef} from '@angular/core';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.styl']
})
export class ToastComponent {

  constructor(private toastService: ToastService) {

  }
  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
