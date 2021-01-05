import { Component, Input, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;
  isShown = false;

  constructor(private modalService: ModalService, private el: ElementRef) {
      this.element = this.el.nativeElement;
  }

  ngOnInit(): void {
      if (!this.id) {
          console.error('modal must have an id');
          return;
      }
      document.body.appendChild(this.element);
      this.element.addEventListener('click', el => {
          if (el.target.className === 'modal') {
              this.close();
          }
      });
      this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
      this.modalService.remove(this.id);
      this.element.remove();
  }

  // open modal
  open(): void {
    this.isShown = true;
  }

  // close modal
  close(): void {
    this.isShown = false;
  }
}
