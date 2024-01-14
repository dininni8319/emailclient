import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})

export class EmailShowComponent implements OnInit {
  email!: Email;

  constructor(
    private route: ActivatedRoute,
  ) {

    this.email = this.route.snapshot.data['email']
    this.route.data.subscribe(({ email }) => {
      this.email = email
    })
  }
  

  ngOnInit(): void {
    // params property is a BehaviourSubject
    // this is not the best way to implement this func
    // this.route.params.subscribe(( { id} ) => {
    //   this.emailService.getEmail(id).subscribe((result) => {
    //     console.log('====================================');
    //     console.log('email fetched:\t', result);
    //     console.log('====================================');
    //   })
    // })
    //with snapshot this component will be not created 
    // console.log(this.route.snapshot.params['id'])


    // this.route.params.pipe(
    //   switchMap(({ id }) => {
    //     return this.emailService.getEmail(id)
    //   })
    // ).subscribe((email) => {
    //     this.email = email
    // })
  }
}
