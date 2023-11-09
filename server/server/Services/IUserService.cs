using server.Models;

namespace server.Services
{
    public interface IUserService
    {
        List<User> Get();
        User Get(string id);
        User Create(User user);
        void Update(string id, User user);
        void Remove(string id);
    }
}
