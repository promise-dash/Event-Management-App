using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace server.Models
{
    public class Event
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = String.Empty;

        [BsonElement("creator")]
        public User Creator { get; set; } = new User();

        [BsonElement("eventName")]
        public string EventName { get; set; } = String.Empty;
        
        [BsonElement("description")]
        public string Description { get; set; } = String.Empty;
        
        [BsonElement("category")]
        public string Category { get; set; } = String.Empty;

        [BsonElement("dateOfEvent")]
        public string DateOfEvent { get; set; } = String.Empty;
        
        [BsonElement("time")]
        public string Time { get; set; } = String.Empty;

        [BsonElement("location")]
        public string Location { get; set; } = String.Empty;
        
        [BsonElement("price")]
        public float Price { get; set; } = float.MinValue;

        [BsonElement("attendees")]
        public List<string> Attendees { get; set; } = new List<string>();

        [BsonElement("feedbacks")]
        public List<Feedback> Feedbacks { get; set; } = new List<Feedback>();

        [BsonElement("images")]
        public string Image { get; set; } = String.Empty;

    }
}
