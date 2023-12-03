import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject, map,of } from "rxjs";
import { User } from '../models/User';
import { Event } from '../models/Event';
import { Feedback } from '../models/Feedback';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user: User;
  isUserLoggedIn = false;

  mySubject = new Subject<boolean>;

  userBaseUrl = "http://localhost:5263/api/Users";
  eventBaseUrl = "http://localhost:5263/api/Events";
  cloudinaryUrl = "https://api.cloudinary.com/v1_1/${cloudName}/upload";


  constructor(private http: HttpClient) {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString); 
    }
  }

  getUserFromLocalStorage(){
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    } 
  }

  // Authentication
  registerUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.userBaseUrl}/register`, user);
  }

  loginUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.userBaseUrl}/login`, user);
  }

  
  //User endpoints
  fetchAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.userBaseUrl}`);
  }

  fetchUserById(userId: string): Observable<User>{
    return this.http.get<User>(`${this.userBaseUrl}/${userId}`);
  }

  deleteUser(id: string):Observable<string>{
    return this.http.delete<string>(`${this.userBaseUrl}/${id}`);
  }


  //Event endpoints
  private cachedEvents: Array<any> = [];
  private cachedFlag = false;

  fetchEvents():Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventBaseUrl}`);
    // if(this.cachedFlag){
    //   console.log("Api not fetched");

    //   return of(this.cachedEvents);
    // }
    // else{
    //   console.log("Api fetched");


    //   this.cachedFlag=true;

    //   return this.http.get<Event[]>(`${this.eventBaseUrl}`).pipe(
    //     map((data:Event[])=>{
    //       this.cachedEvents=data;
    //       return data;
    //     })
    //   );
    // }
  }

  fetchEventById(id: string):Observable<Event>{
    return this.http.get<Event>(`${this.eventBaseUrl}/${id}`);
  }

  createEvent(event: Event):Observable<Event>{
    const newEvent = {
      ...event,
      attendees: [],
      feedbacks: []
    };
    return this.http.post<Event>(`${this.eventBaseUrl}`, newEvent);
  }

  fetchEventsOfUser(userId: string): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.eventBaseUrl}/user/${userId}`);
  }

  updateEvent(eventId: string, event: Event):Observable<Event>{
    // this.cachedFlag=false;
    return this.http.put<Event>(`${this.eventBaseUrl}/${eventId}`, event);
  }

  deleteEvent(id: string): Observable<string>{
    // this.cachedFlag=false;
    return this.http.delete<string>(`${this.eventBaseUrl}/${id}`);
  }

  bookAnEvent(eventId: string):Observable<string>{
    return this.http.post<string>(`${this.eventBaseUrl}/${eventId}/attendees?userId=${this.user.id}`, '');
  }

  giveFeedback(eventId: string, feedback: Feedback): Observable<string>{
    return this.http.post<string>(`${this.eventBaseUrl}/${eventId}/feedbacks`, feedback);
  }
}
