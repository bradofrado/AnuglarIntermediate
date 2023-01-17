import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "../common/toastr.service";
import { EventService } from "./shared/event.service";

@Component({
  selector: 'events-list',
  templateUrl: `./events-list.component.html`
})
export class EventsListComponent implements OnInit {
  constructor(private eventService: EventService, 
    private toastr: ToastrService, private route: ActivatedRoute) {}

  events!: any;
  ngOnInit(): void {
      this.events = this.route.snapshot.data['events'];
  }

  handleThumbnailClick(eventName: string) {
    this.toastr.success(eventName);
  }
}