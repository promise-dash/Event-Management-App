using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class Feedback
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = String.Empty;

        [BsonElement("review")]
        public string Review { get; set; } = String.Empty;

        [BsonElement("reply")]
        public string Reply { get; set; } = String.Empty;
    }
}
