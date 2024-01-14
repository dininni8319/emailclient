import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    InputComponent,
    NavigationComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    NavigationComponent,
    ModalComponent // adde components here to be exported
  ]
})
export class SharedModule { }
