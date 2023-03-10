import { Component, ElementRef, Inject, Input, ViewChild } from "@angular/core";
import { JQ_TOKEN } from "./jquery.service";

@Component({
  selector: 'simple-modal',
  template: `
  <div [id]="elementId" class="modal fade" #modalcontainer tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-header">
        <button type="button" class="close"
          data-dismiss="modal"><span>&times;</span></button>
        <h4 class="modal-title">{{title}}</h4>
      </div>
      <div class="modal-body">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .modal-body { height: 250px; overflow-y: scroll; }
  `]
})
export class SimpleModalComponent {
  @Input() title!: string;
  @Input() elementId!: string;
  @ViewChild('modalcontainer') containerEl!: ElementRef;

  constructor(@Inject(JQ_TOKEN) private $: any) {}

  close() {
    this.$(this.containerEl.nativeElement).modal('hide');
  }
}