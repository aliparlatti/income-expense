import type { CapacitorConfig } from '@capacitor/cli';
/// <reference types="'@codetrix-studio/capacitor-google-auth'" />

const config: CapacitorConfig = {
  appId: 'com.alip.incomeexpense',
  appName: 'income-expense',
  webDir: 'www',
  plugins: {
    "GoogleAuth": {
      "scopes": [
        "profile",
        "email"
      ],
      "serverClientId": "227419213250-97fun5umc2sp4oeobg0n0pa24rfrc7uk.apps.googleusercontent.com",
      "androidClientId": "227419213250-97fun5umc2sp4oeobg0n0pa24rfrc7uk.apps.googleusercontent.com",
      "clientId": "227419213250-97fun5umc2sp4oeobg0n0pa24rfrc7uk.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    }
  }
};

export default config;
