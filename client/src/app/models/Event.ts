import { Feedback } from "./Feedback"

export class Event{
    "id": string
    "eventName": string
    "description": string
    "date": string
    "location": string
    "price": string
    "category": string
    "image": string
    "attendees": Array<string>
    "feedbacks": Array<Feedback>
}