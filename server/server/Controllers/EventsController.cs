using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private IEventService EventService;

        public EventsController(IEventService EventService)
        {
            this.EventService = EventService;
        }
        // GET: api/<EventController>
        [HttpGet]
        public ActionResult<List<Event>> Get()
        {
            return EventService.Get();
        }

        // GET api/<EventsController>/5
        [HttpGet("{id}")]
        public ActionResult<Event> Get(string id)
        {
            var Event = EventService.GetById(id);

            if (Event == null)
            {
                return NotFound($"Event with Id = {id} not found");
            }

            return Event;
        }

        // POST api/<EventsController>
        [HttpPost]
        public ActionResult<Event> Post([FromBody] Event newEvent)
        {
            newEvent.Id = ObjectId.GenerateNewId().ToString();
            EventService.Create(newEvent);

            return CreatedAtAction(nameof(Get), new { id = newEvent.Id }, newEvent);
        }

        // PUT api/<EventsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Event e)
        {
            var existingEvent = EventService.GetById(id);

            if (existingEvent == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            EventService.Update(id, e);

            return NoContent();
        }

        // DELETE api/<EventsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var Event = EventService.GetById(id);

            if (Event == null)
            {
                return NotFound($"Event with Id = {id} not found");
            }

            EventService.Delete(Event.Id);

            return Ok($"Event deleted");
        }

        [HttpPost("{eventId}/attendees")]
        public IActionResult AddAttendee(string eventId, string userId)
        {
            try
            {
                EventService.AddAttendee(eventId, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to add attendee: {ex.Message}");
            }
        }

        [HttpPost("{eventId}/feedbacks")]
        public IActionResult AddFeedback(string eventId, [FromBody] Feedback feedback)
        {
            try
            {
                EventService.AddFeedback(eventId, feedback);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to add feedback: {ex.Message}");
            }
        }


        [HttpGet("user/{userId}")]
        public IActionResult AddAttendee(string userId)
        {
            var events = EventService.GetEventByUserId(userId);
            return Ok(events);
        }
    }
}
