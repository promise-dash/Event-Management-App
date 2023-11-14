using server.Models;

namespace server.Services
{
    public interface IEventService
    {
        List<Event> Get();
        Event GetById(string id);
        Event Create(Event e);
        void Update(string id, Event e);
        void Delete(string id);
        void AddAttendee(string eventId, string userId);
        void AddFeedback(string eventId, Feedback feedback);
        List<Event> GetEventByUserId(string userId);
    }
}
