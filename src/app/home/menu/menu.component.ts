import { Component } from '@angular/core';
import { Profile } from '../../profile/profile';
import { ProfileService } from '../../profile/profile.service';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { tap } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf,RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  
  profile: Profile | undefined;  
  login: boolean = false;

  constructor(
    
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthenticationService
   ) {}



  cerrarSesion() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

  getProfile(): void {
    try {
      this.profileService
        .getProfile()

        .pipe(
          tap((Data) => {
            console.log(Data);
            if (Data.email == null) {
              this.login = false;
              this.router.navigate(['/login']);
            } else {
              this.login = true;
            }
          })
        )
        .subscribe((profile) => (this.profile = profile));

      this.login = true;
    } catch (error) {
      console.log('ir a login');
      this.login = false;
    }
  }
  ngOnInit() {
    
    this.getProfile();
  }

  ngAfterContentInit() {
  

    this.getProfile();
  }

  validar() {
    console.log('validar');
    this.authService.isLoggedIn().then((res) => {
      this.login = res;
    });
  }
}
