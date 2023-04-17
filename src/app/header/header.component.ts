import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();

  menuButtonStatus: boolean = true;

  constructor() { }

  ngOnInit(): void { }

  toggleSideNav() {
    this.menuButtonStatus = !this.menuButtonStatus;

    //Emitting this event in app component
    this.sideNavToggled.emit(this.menuButtonStatus);
  }
}
