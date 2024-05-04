using DatingApp.DAL.Interfaces;
using DatingApp.Extensions;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace DatingApp.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();
            if (!resultContext.HttpContext.User.Identity.IsAuthenticated)
            {
                return;
            }
            var userId = resultContext.HttpContext.User.getUserId();
            var _userDAL = resultContext.HttpContext.RequestServices.GetRequiredService<IUserDAL>();
            var user = await _userDAL.GetUserById(userId);
            user.LastActive = DateTime.UtcNow;
            await _userDAL.SaveAllAsync();
        }
    }
}
