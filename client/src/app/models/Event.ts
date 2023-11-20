import { Feedback } from "./Feedback"
import { User } from "./User"

export class Event{
    "id": string
    "creator": User
    "eventName": string
    "description": string
    "category": string
    "dateOfEvent": string
    "time": string
    "location": string
    "price": number
    "image": string
    "attendees": Array<string>
    "feedbacks": Array<Feedback>
}