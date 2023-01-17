import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Error404Component } from './errors/404.components';

import {
  CreateEventComponent,
  EventDetailsComponent,
  EventThumbnailComponent,
  EventsListComponent
} from './events/index'
import { EventsAppComponent } from './events-app.component';
import { NavbarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    NavbarComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {provide: 'canDeactiveCreateEvent', useValue: checkDirtyState}
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm("You have not saved this event. Do you want to continue?");
  }

  return true;
}
