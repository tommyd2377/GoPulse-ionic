import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FolloweesPage } from './followees';

@NgModule({
  declarations: [
    FolloweesPage,
  ],
  imports: [
    IonicPageModule.forChild(FolloweesPage),
  ],
})
export class FolloweesPageModule {}
