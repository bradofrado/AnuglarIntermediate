import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "./shared";

@Component({
  selector: 'create-event',
  templateUrl: './create-event.component.html',
  styles: [`
  em {float: right; color: #E05C65; padding-left: 10px; }
  .error input {background-color: #E3C3C5}
  .error ::-webkit-input-placeholder {color: #999}
  .error ::-moz-placeholder {color: #999}
  .error :-moz-placeholder {color: #999}
  .error :-ms-input-placeholder {color: #999}
  `]
})
export class CreateEventComponent implements OnInit {
  isDirty = true;
  newEvent: any;
  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
      this.newEvent = {
        name: 'Ng Spectacular',
        date: '8/8/2028',
        time: '10am',
        price: 799.99,
        location: {
          address: '456 Happy St',
          city: 'Felicty',
          country: 'Angularistan',
        },
        onlineUrl: 'http://ngSpectacular.com',
        imageUrl: 'http://ngSpectacular.com/logo.png'
      }
  }

  saveEvent(formValues:any) {
    this.eventService.saveEvent(formValues).subscribe(() => {
			this.isDirty = false;
			this.router.navigate(['/events']);
		});
  }

  cancel() {
    this.router.navigate(['/events'])
  }
}