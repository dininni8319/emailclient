import { 
  Component, 
  ElementRef, 
  OnInit, 
  Output, 
  EventEmitter 
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  @Output() dismiss = new EventEmitter();

  constructor(
    private element: ElementRef
  ) {}

  ngOnInit(): void {
    document.body.appendChild(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.element.nativeElement.remove();
  }

  onDismissClick() {
    this.dismiss.emit();
  }
}
