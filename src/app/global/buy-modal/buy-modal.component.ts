import { Component, Input, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ModalService } from 'src/app/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent implements OnInit {
  @Input() id: string;
  private element: any;
  isShown = false;
  isLoading = false;
  isError = false;

  constructor(
    private modalService: ModalService,
     private el: ElementRef,
     private cartService: CartService,
     private router: Router) {
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

  getMoneyAmount(): number{
    return this.cartService.getTotalPrice();
  }

  pay(): void {
    this.isLoading = true;
    this.cartService.pay()
    .subscribe({
      next: () => {
          // TODO Change to orders page
          this.close();
          this.cartService.clearCart();
          this.router.navigate(['/home']);
          this.isLoading = false;
      },
      error: () => {
          this.isError = true;
          this.isLoading = false;
      }
    });
  }
}
