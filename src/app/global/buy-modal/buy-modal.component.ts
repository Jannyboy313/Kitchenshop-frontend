import { Component, Input, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent implements OnInit {
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
      this.modalService.add(this);
  }

  // open modal
  open(): void {
    this.isShown = true;
  }

  // close modal
  close(): void {
    this.isShown = false;
  }

  pay(): void {
    
  }
}
