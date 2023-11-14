using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService UserService;

        public UsersController(IUserService UserService)
        {
            this.UserService = UserService;
        }
        // GET: api/<UsersController>
        [HttpGet]
        public ActionResult<List<User>> Get()
        {
            return UserService.Get();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public ActionResult<User> Get(string id)
        {
            var User = UserService.GetById(id);

            if (User == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            return User;
        }

        // POST api/<UsersController>
        [HttpPost]
        public ActionResult<User> Post([FromBody] User User)
        {
            User.Id = ObjectId.GenerateNewId().ToString();
            UserService.Create(User);

            return CreatedAtAction(nameof(Get), new { id = User.Id }, User);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] User User)
        {
            var existingUser = UserService.GetById(id);

            if (existingUser == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            UserService.Update(id, User);

            return NoContent();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var User = UserService.GetById(id);

            if (User == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            UserService.Delete(User.Id);

            return Ok($"User with Id = {id} deleted");
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(User user)
        {
            user.Id = ObjectId.GenerateNewId().ToString();
            var registeredUser = await UserService.Register(user);
            return Ok(registeredUser);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(User user)
        {
            var loginUser = await UserService.Login(user.Email, user.Password);
            if (loginUser == null)
            {
                return Unauthorized();
            }
            else
            {
                return Ok(loginUser);
            }
        }
    }
}
