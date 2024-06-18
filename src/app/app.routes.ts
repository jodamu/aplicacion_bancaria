import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductsComponent } from './products/products.component';
import { authGuard } from './authentication/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home',component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', 
        canActivate: [authGuard], component: ProfileComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'transactions',canActivate: [authGuard], component: TransactionsComponent },
    { path: 'products', 
        canActivate: [authGuard], component: ProductsComponent },
    { path: '**', component: NotfoundComponent },
];
