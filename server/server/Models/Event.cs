using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace server.Models
{
    public class Event
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("eventName")]
        public string EventName { get; set; } = String.Empty;
        
        [BsonElement("description")]
        public string Description { get; set; } = String.Empty;
        
        [BsonElement("category")]
        public string Category { get; set; } = String.Empty;
        
        [BsonElement("dateOfEvent")]
        public DateTime DateOfEvent { get; set; }

        [BsonElement("location")]
        public string Location { get; set; } = String.Empty;

        [BsonElement("attendees")]
        public ObjectId[]? Attendees { get; set; }
        
        [BsonElement("feedbacks")]
        public Feedback[]? Feedbacks { get; set; }



    }
}
