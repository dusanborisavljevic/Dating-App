using System.Security.Claims;

namespace DatingApp.Extensions
{
    public static class ClaimsPrinicpialExtensions
    {
        public static string getUserName(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
