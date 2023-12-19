import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse, HttpRequest } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  headers = {
    'headers': { 'Content-Type': 'application/json' }
  };

  constructor(private http: HttpClient, private route: Router) { }

  async postHttp(url: any, data: any) {
    return await this.http.post(url, data, this.headers).toPromise();
  }

  async getHttp(url: any) {
    return await this.http.get(url, this.headers).toPromise();

  }

  cachedRequests: Array<HttpRequest<any>> = [];
  public getToken(): string {

    return localStorage.getItem('accessToken') || '{}';
  }

  public tokenNotExpired(token: any) {
    if (token)
      return true;
    else
      return false;
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean indicating whether or not the token is expired
    return this.tokenNotExpired(token);
    // return false;
  }

  logout() {
    this.route.navigateByUrl('login')
    localStorage.clear();
  }
}
