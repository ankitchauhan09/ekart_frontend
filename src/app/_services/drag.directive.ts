import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDrag]',
  standalone: true
})
export class DragDirective {

  constructor() { }

    @Output() fileDropped = new EventEmitter<File>();

  @HostBinding("style.background") private background = '#eee';

  @HostListener("dragover", [`$event`])
  public onDragOver(event : DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.background = '#999';
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";
  }

  @HostListener('drop', ["$event"])
  public onDrop(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";

    const files = event.dataTransfer?.files;
    if(files && files.length > 0){
      this.fileDropped.emit(files[0]);
    }

  }

}
