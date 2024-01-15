import { 
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { 
  FormGroup, 
  FormControl,
  Validators 
} from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})

export class EmailFormComponent implements OnInit {
  @Input() email!: Email;
  @Output() emailSubmit = new EventEmitter()

  emailForm!: FormGroup

  constructor() {}

  ngOnInit(): void {
    const { to, from, subject, text } = this.email
    
    this.emailForm = new FormGroup({
      to: new FormControl(to, [ 
        Validators.required, 
        Validators.email
      ]),
      // from in this case is droped when disabled
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [
        Validators.required
      ]),
      text: new FormControl(text, [
        Validators.required
      ]),
    })
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }
    
    this.emailSubmit.emit(this.emailForm.value);
    // console.log(this.emailForm.getRawValue()); // gets also the disable
  }
}
