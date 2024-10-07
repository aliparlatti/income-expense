
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }
  protected async getTableData(tableName: string) {
    const { data, error } = await this.supabase
      .from(tableName)
      .select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  async signInWithGoogleIdToken(idToken: string) {
    const { data, error } = await this.supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
  async refreshAccessToken(refreshToken: string) {
    const { data, error } = await this.supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
