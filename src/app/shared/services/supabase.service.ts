import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  protected async getTableData(tableName: string, columns?: string[]) {
    const {data, error} = await this.supabase
      .from(tableName)
      .select(columns?.length ? columns.join(',') : '*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  protected async delete(tableName: string, condition: { [key: string]: any }) {
    const {data: deletedData, error} = await this.supabase
      .from(tableName)
      .delete()
      .match(condition);

    if (error) {
      throw new Error(error.message);
    }
    return deletedData;
  }

  protected async insertData(tableName: string, data: any) {
    const {data: insertedData, error} = await this.supabase
      .from(tableName)
      .insert([data]);

    if (error) {
      throw new Error(error.message);
    }
    return insertedData;
  }

  protected async updateData(tableName: string, data: any, condition: any) {
    const {data: updatedData, error} = await this.supabase
      .from(tableName)
      .update(data)
      .match(condition);
    if (error) {
      throw new Error(error.message);
    }

    return updatedData;
  }


  async signInWithGoogleIdToken(idToken: string) {
    const {data, error} = await this.supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async refreshAccessToken(refreshToken: string) {
    const {data, error} = await this.supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
