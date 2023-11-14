using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class Feedback
    {
        [BsonElement("userid")]
        public string? UserId { get; set; }

        [BsonElement("review")]
        public string? Review { get; set; }

        [BsonElement("reply")]
        public string? Reply { get; set; }
    }
}
