import { Routes } from "@angular/router";
import { Error404Component } from "./errors/404.components";
import { 
  CreateEventComponent,
  EventDetailsComponent,
  EventRouteActivator,
  EventListResolver,
  EventsListComponent, 
  CreateSessionComponent
} from './events/index'



export const appRoutes:Routes = [
  { path: 'events', component: EventsListComponent, resolve: {events:EventListResolver}},
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactiveCreateEvent']},
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator]},
  { path: 'events/session/new', component: CreateSessionComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)}
]