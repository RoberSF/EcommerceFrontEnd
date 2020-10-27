import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  toggledValue = true;
  @Output() toggleChange = new EventEmitter<boolean>();

  toggled() {
    if (this.toggledValue === undefined) { //lo hacemos simplemente como validación aun que siempre tendrá un valor
      this.toggledValue = true;
    }
    this.toggledValue = !this.toggledValue; // Es la manera de asignarle el valor contrario al valor que ya tiene
    console.log(this.toggledValue);
    this.toggleChange.emit(this.toggledValue);
  }
}
