import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserFolloweesPage } from './user-followees';

@NgModule({
  declarations: [
    UserFolloweesPage,
  ],
  imports: [
    IonicPageModule.forChild(UserFolloweesPage),
  ],
})
export class UserFolloweesPageModule {}
