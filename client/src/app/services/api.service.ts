import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable,map,of, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user: any;
  isUserLoggedIn: boolean = false;

  mySubject = new Subject<boolean>;

  theme: string = 'light';

  userBaseUrl = "http://localhost:5263/api/Users";
  eventBaseUrl = "http://localhost:5263/api/Events";
  cloudinaryUrl = "https://api.cloudinary.com/v1_1/${cloudName}/upload";


  constructor(private http: HttpClient) {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      console.log(this.user);
    } else {
      console.log('User is not logged in.');
    }
  }

  getUserFromLocalStorage(){
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      console.log(this.user);
    } else {
      console.log('User is not logged in.');
    }
  }

  // Authentication
  registerUser(user: any): Observable<any>{
    return this.http.post<any>(`${this.userBaseUrl}/register`, user);
  }

  loginUser(user: any): Observable<any>{
    return this.http.post<any>(`${this.userBaseUrl}/login`, user);
  }

  
  //User endpoints
  
  fetchAllUsers(): Observable<any>{
    return this.http.get<any>(`${this.userBaseUrl}`);
  }

  fetchUserById(userId: string): Observable<any>{
    return this.http.get<any>(`${this.userBaseUrl}/${userId}`);
  }

  deleteUser(id: string){
    return this.http.delete<any>(`${this.userBaseUrl}/${id}`);
  }


  //Event endpoints
  private cachedEvents:Array<any>=[];
  private cachedFlag:boolean=false;

  fetchEvents():Observable<any> {
    if(this.cachedFlag){
      console.log("Api not fetched");
      
      return of(this.cachedEvents);
    }
    else{
      console.log("Api fetched");
      

      this.cachedFlag=true;

      return this.http.get<any[]>(`${this.eventBaseUrl}`).pipe(
        map((data:any)=>{
          this.cachedEvents=data;
          return data;
        })
      );
    }
  }

  fetchEventById(id: string):Observable<any>{
    return this.http.get<any>(`${this.eventBaseUrl}/${id}`);
  }

  createEvent(event: any):Observable<any>{
    const newEvent = {
      ...event,
      attendees: [],
      feedbacks: []
    };
    return this.http.post<any>(`${this.eventBaseUrl}`, newEvent);
  }

  fetchEventsOfUser(userId: string){
    return this.http.get<any[]>(`${this.eventBaseUrl}/user/${userId}`);
  }

  updateEvent(eventId: string, event: any):Observable<any>{
    this.cachedFlag=false;
    return this.http.put<any>(`${this.eventBaseUrl}/${eventId}`, event);
  }

  deleteEvent(id: string): Observable<any>{
    this.cachedFlag=false;
    return this.http.delete<any>(`${this.eventBaseUrl}/${id}`);
  }

  bookAnEvent(eventId: string):Observable<any>{
    return this.http.post<any>(`${this.eventBaseUrl}/${eventId}/attendees?userId=${this.user.id}`, '');
  }

  giveFeedback(eventId: string, feedback: any): Observable<any>{
    return this.http.post(`${this.eventBaseUrl}/${eventId}/feedbacks`, feedback);
  }
}
