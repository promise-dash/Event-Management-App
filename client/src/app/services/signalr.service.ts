import { CSP_NONCE, Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { Observable, Subject } from "rxjs";
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: "root"
})
export class SignalrService {

  private hubConnection: signalR.HubConnection;

  constructor() {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5273/chatHub', { withCredentials: true })
      .build();

    connection.start()
      .then(() => console.log('SignalR connection established.'))
      .catch(err => console.error(err));
  }

  public sendMessage(user: string, message: string): void {
    this.hubConnection.invoke("SendMessage", user, message);
  }

  public receiveMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.hubConnection.on("ReceiveMessage", (user, message) => {
        observer.next({ user, message });
      });
    });
  }
}