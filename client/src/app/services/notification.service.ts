import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  apiKey = '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';

  constructor(){
    console.log("notification service");
  }

  sendEmail(to: string, subject: string, content: string): Promise<any> {
    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const data = {
      sender: {
        email: 'promisedash1607@gmail.com',
        name: 'Promise Dash'
      },
      to: [{ email: to }],
      subject: subject,
      htmlContent: content
    };
    const options = {
      headers: {
        'api-key': this.apiKey,
        'Content-Type': 'application/json'
      }
    };
    return axios.post(url, data, options)
      .then(response => response.data)
      .catch(error => console.error('Error sending email:', error));
  }

}