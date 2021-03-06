import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  errors = [];
  isSent: boolean;
  constructor( private _contactService: ContactService,
    private _router: Router) { }

  ngOnInit(): void {
    this.isSent = true;
  }

  contactForm:FormGroup = new FormGroup(
    {
      "email": new FormControl("",[Validators.required,Validators.email]),
      "name": new FormControl("",[Validators.required,Validators.minLength(2)]),
      "subject": new FormControl("",[Validators.required,Validators.minLength(4)]),
      "message": new FormControl("",[Validators.required,Validators.minLength(4)]),
    }  
  );

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const contact = form.value;
      console.log(contact);
      
      this._contactService.addContact(contact).subscribe(
        (res: any) => {
          this.isSent=false;
          console.log("Message sent successfully!")
          this.errors = [];
          form.reset();
        
        },
        (err: any) => {
          console.log(err);
          this.errors = err.error.error || [];
        }
      )
    }

  }

}
