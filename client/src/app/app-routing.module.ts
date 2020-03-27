import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { CrudPageComponent } from './crud-page/crud-page.component';
import { UserFormComponent } from './crud-page/user-form/user-form.component';


const routes: Routes = [
  {
    path: "",
    component: SiteLayoutComponent,
    children: [
      { path: "", redirectTo: "/CRUD", pathMatch: "full" },
      { path: "CRUD", component: CrudPageComponent},
      { path: "user/add", component: UserFormComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
