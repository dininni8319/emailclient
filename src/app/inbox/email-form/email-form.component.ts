import { 
  Component,
  Input,
  OnInit
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
  
  emailForm!: FormGroup

  constructor() {}

  ngOnInit(): void {
    const { to, from, subject, text } = this.email
    
    this.emailForm = new FormGroup({
      to: new FormControl(to, [ 
        Validators.required, 
        Validators.email
      ]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [
        Validators.required
      ]),
      text: new FormControl(text, [
        Validators.required
      ]),
    })
  }
}