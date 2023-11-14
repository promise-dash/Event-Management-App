using server.Models;

namespace server.Services
{
    public interface IUserService
    {
        List<User> Get();
        User GetById(string id);
        User Create(User user);
        void Update(string id, User user);
        void Delete(string id);
        Task<User> Register(User user); 
        Task<User> Login(string email, string password);
    }
}
