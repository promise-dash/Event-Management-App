using MongoDB.Bson;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class EventService: IEventService
    {
        private readonly IMongoCollection<Event> _events;

        public EventService(IMongoClient? mongoClient, IDatabaseSettings? databaseSettings)
        {
            var database = mongoClient.GetDatabase(databaseSettings.DatabaseName);
            _events = database.GetCollection<Event>(databaseSettings.EventCollectionName);
        }

        public Event Create(Event e)
        {
            //e.Attendees.RemoveAt(0);
            //e.Feedbacks.RemoveAt(0);
            _events.InsertOne(e);
            return e;
        }

        public List<Event> Get()
        {
            return _events.Find(e => true).ToList();
        }

        public Event GetById(string id)
        {
            return _events.Find(e => e.Id == id).FirstOrDefault();
        }

        public void Delete(string id)
        {
            _events.DeleteOne(e => e.Id == id);
        }

        public void Update(string id, Event e)
        {
             e.Id = id;
            _events.ReplaceOne(ev => ev.Id == id, e);
        }

        public void AddAttendee(string eventId, string userId)
        {
            var filter = Builders<Event>.Filter.Eq(e => e.Id, eventId);

            var objectId = new ObjectId(userId);

            var update = Builders<Event>.Update.AddToSet(e => e.Attendees, objectId.ToString());

            var eventToUpdate = _events.Find(filter).FirstOrDefault();
            if (!eventToUpdate.Attendees.Contains(userId))
            {
                _events.UpdateOne(filter, update);
            }
        }

        public void AddFeedback(string eventId, Feedback feedback)
        {
            var filter = Builders<Event>.Filter.Eq(e => e.Id, eventId);
            var update = Builders<Event>.Update.Push(e => e.Feedbacks, feedback);

            _events.UpdateOne(filter, update);
        }


        public List<Event> GetEventsByUserId(string userId)
        {
            var filter = Builders<Event>.Filter.Eq("creator._id", new ObjectId(userId));
            return _events.Find(filter).ToList();
        }

        public async Task<List<Event>> GetEventsBookedByUser(string userId)
        {
            var filter = Builders<Event>.Filter.ElemMatch(
                e => e.Attendees,
                a => a == userId
            );
            var events = await _events.FindAsync(filter);
            return await events.ToListAsync();
        }
    }
}
