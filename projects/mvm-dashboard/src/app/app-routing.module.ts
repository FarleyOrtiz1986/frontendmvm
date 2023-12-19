import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './dashboard/home/home.component';
import { checkLoginGuard } from 'projects/fy-guards/src/check-login.guard';
import { isAlreadyLoginGuard } from 'projects/fy-guards/src/is-already-login.guard';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
   /**
   * Authentication
   */
   { path: '', component: LoginComponent ,  canActivate: [isAlreadyLoginGuard]  },
  //  { path: 'registrarse', component: RegisterComponent, canActivate: [isAlreadyLoginGuard] },
  //  { path: 'registrarse/:id', component: RegisterComponent, canActivate: [isAlreadyLoginGuard]  },
   //{ path: 'resetpassword/:token', component: ResetPasswordComponent, canActivate: [isAlreadyLoginGuard] },
   
   
   { path: 'home', component: HomeComponent, canActivate: [checkLoginGuard]},
 
   {
     path: '',
     redirectTo: '',
     pathMatch: 'full'
   },
   {
     path: '**',
     redirectTo: '',
     pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
