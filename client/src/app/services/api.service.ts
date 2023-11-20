import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject } from "rxjs";
import { User } from '../models/User';
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
    } else {
      console.log('User is not logged in.');
    }
  }

  getUserFromLocalStorage(){
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    } else {
      console.log('User is not logged in.');
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

  deleteUser(id: string):Observable<any>{
    return this.http.delete<any>(`${this.userBaseUrl}/${id}`);
  }


  //Event endpoints
  // private cachedEvents:Array<any>=[];
  // private cachedFlag:boolean=false;

  fetchEvents():Observable<any> {
    return this.http.get<any[]>(`${this.eventBaseUrl}`);
  }

  fetchEventById(id: string):Observable<any>{
    return this.http.get<any>(`${this.eventBaseUrl}/${id}`);
  }

  createEvent(event: Event):Observable<Event>{
    const newEvent = {
      ...event,
      attendees: [],
      feedbacks: []
    };
    return this.http.post<Event>(`${this.eventBaseUrl}`, newEvent);
  }

  fetchEventsOfUser(userId: string){
    return this.http.get<any[]>(`${this.eventBaseUrl}/user/${userId}`);
  }

  updateEvent(eventId: string, event: any):Observable<any>{
    // this.cachedFlag=false;
    return this.http.put<any>(`${this.eventBaseUrl}/${eventId}`, event);
  }

  deleteEvent(id: string): Observable<any>{
    // this.cachedFlag=false;
    return this.http.delete<any>(`${this.eventBaseUrl}/${id}`);
  }

  bookAnEvent(eventId: string):Observable<any>{
    return this.http.post<any>(`${this.eventBaseUrl}/${eventId}/attendees?userId=${this.user.id}`, '');
  }

  giveFeedback(eventId: string, feedback: Feedback): Observable<any>{
    return this.http.post(`${this.eventBaseUrl}/${eventId}/feedbacks`, feedback);
  }
}
