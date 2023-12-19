import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.users;
  userJson = environment.usersTemp;
  userDetailJson = environment.userDetailsTemp;
  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(this.url + '/');
}

  public getUserById(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/' + id);
  }

  public getUserByUsername(username: string): Observable<any> {
    let params = new HttpParams().set('username', username);
    return this.http.get<any>(this.url + "/username", {params: params} );
  }

  public saveUser(data: any): Observable<any> {
    return this.http.post(this.url + '/save', data);
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public changePassword(data: any): Observable<any> {
    console.log(data);
    return this.http.post(this.url + '/password/change', data);
  }

  public uploadPhoto(data: any): Observable<any> {
    const file: FormData = new FormData();
    file.set('id', data.id);
    file.set('imageFile', data.imageFile);
    return this.http.post(this.url + '/' + 'photo/upload', file);
  }

  //REMOVE IF BACKEND IS LIVE
  public getUserCreds(){
    return this.http.get(this.userJson).toPromise();
  }
  public getUserDetails(){
    return this.http.get(this.userDetailJson).toPromise();
  }

}
