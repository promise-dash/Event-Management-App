using server.Models;

namespace server.Services
{
    public interface IAuthService
    {
        User Register(User user);
        User GetByUsername(string email);
        string Authenticate(string email, string password);
    }
}
