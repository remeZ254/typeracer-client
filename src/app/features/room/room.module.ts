import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomComponent } from './container/room.component';

@NgModule({
  declarations: [RoomComponent],
  imports: [CommonModule, FormsModule],
})
export class RoomModule {}
