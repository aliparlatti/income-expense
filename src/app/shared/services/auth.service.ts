import { Injectable } from '@angular/core';
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { SupabaseService } from "./supabase.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { Storage } from "@ionic/storage-angular";
import {ToastrService} from "./toastr.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private storage: Storage,
    private toastr:ToastrService
  ) {
  }

  public async signIn() {
    const gUser = await GoogleAuth.signIn();
    try {
      const idToken = gUser.authentication.idToken;

      if (!idToken) {
        throw new Error('Google ID Token could not be retrieved!');
      }

      const userData = await this.supabaseService.signInWithGoogleIdToken(idToken);

      if (userData) {
        const { access_token, refresh_token, user } = userData.session;

        await this.storage.set('access_token', access_token);
        await this.storage.set('refresh_token', refresh_token);

        this.user$.next(new User(user?.user_metadata));
        this.router.navigateByUrl('/tabs/dashboard');
        await this.toastr.showToast('success', 'Logged ' + this.user$.value?.name,['z-50','-my-12'])
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  }

  public async logout() {
    await this.storage.remove('access_token');
    await this.storage.remove('refresh_token');
    this.user$.next(null);
    this.router.navigateByUrl('/login');
  }
  public async check() {
    const accessToken = await this.storage.get('access_token');
    if (!accessToken) {
      this.router.navigateByUrl('/login');
      return false;
    }
    const isExpired = this.isTokenExpired(accessToken);
    if (isExpired || !this.user$?.value?.email) {
      const refreshToken = await this.storage.get('refresh_token');
      if (refreshToken) {
        const userData = await this.supabaseService.refreshAccessToken(refreshToken);
        if (userData) {
          this.user$.next(new User(userData.user.user_metadata))
          const { access_token } = userData.session;
          await this.storage.set('access_token', access_token);
          return true;
        }
      }
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

  private isTokenExpired(token: string): boolean {
    const payload = this.getPayload(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }

  private getPayload(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
}
