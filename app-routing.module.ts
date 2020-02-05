import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TraverseComponent } from './pages/traverse/traverse.component';
import { MinNumberComponent } from './pages/min-number/min-number.component';

const routes: Routes =
 [
  {path:'',component:LoginComponent},
  {path:'traverse',component:TraverseComponent},
  {path:'number',component:MinNumberComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
