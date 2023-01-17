import { Component } from "@angular/core";

@Component({
  selector: 'events-list',
  templateUrl: `./events-list.component.html`
})
export class EventsListComponent {
  event = {
    name: '',
    date: '9/26/2036',
    time: '10:00 am',
    price: 599.99,
    location: {
      city: '1057 DT London',
      country: 'England'
    }
  }
}