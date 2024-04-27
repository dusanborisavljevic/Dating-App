using DatingApp.BL.Implementations;
using DatingApp.BL.Interfaces;
using DatingApp.DAL.Implementations;
using DatingApp.DAL.Interfaces;
using DatingApp.Interfaces;
using DatingApp.Services;

namespace DatingApp.Extensions
{
    public static class ApplicationServices
    {
        public static void InitializeLayers(this IServiceCollection serviceCollections)
        {
            serviceCollections.AddScoped<IUserBL,UserBL>();
            serviceCollections.AddScoped<IUserDAL,UserDAL>();
            serviceCollections.AddScoped<ITokenService,TokenService>();
            serviceCollections.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        }
    }
}