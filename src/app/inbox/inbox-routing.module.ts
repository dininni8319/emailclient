import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailRevolverService } from './email-revolver.service';

const routes: Routes = [
  { 
    path: '', component: HomeComponent,
    children: [
      // we want catch any string as a parameter called id
      { 
        path: ":id", 
        component: EmailShowComponent,
        resolve: {
          email: EmailRevolverService
        }
      },
      { path: '', component: PlaceholderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
