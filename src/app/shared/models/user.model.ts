export class User {
  id: string;
  aud: string;
  email: string;
  emailVerified: boolean;
  exp: number;
  familyName: string;
  givenName: string;
  iat: number;
  iss: string;
  name: string;
  phoneVerified: boolean;
  picture: string;
  sub: string;

  constructor(userData: any) {
    this.id = userData.id;
    this.aud = userData.aud;
    this.email = userData.email;
    this.emailVerified = userData.email_verified;
    this.exp = userData.exp;
    this.familyName = userData.family_name;
    this.givenName = userData.given_name;
    this.iat = userData.iat;
    this.iss = userData.iss;
    this.name = userData.name;
    this.phoneVerified = userData.phone_verified;
    this.picture = userData.picture;
    this.sub = userData.sub;
  }
}
