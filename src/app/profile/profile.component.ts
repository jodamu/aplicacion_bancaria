import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from './profile.service';
import { Profile } from './profile';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule,NgFor, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
 profile: Profile | undefined;
 token: string | undefined;
  constructor(
    private profileService:ProfileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile(): void {
    
    try {
      
       this.profileService.getProfile()
     .subscribe(profile => this.profile = profile);
    } catch (error) {
      console.log('Error al obtener el token de accesofsd');
      this.navigate();
      this.router.createUrlTree(['/login']);
    }
   
 }
 
 navigate(){
  this.router.navigate(['/detail'])
}
 
}
