import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    CommonModule,
    NgbDatepickerModule
  ],
  exports: [
    DatePickerComponent
  ]
})
export class DatePickerModule { }
