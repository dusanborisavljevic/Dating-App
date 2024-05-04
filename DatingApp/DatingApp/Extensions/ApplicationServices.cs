using DatingApp.BL.Implementations;
using DatingApp.BL.Interfaces;
using DatingApp.DAL.Implementations;
using DatingApp.DAL.Interfaces;
using DatingApp.Helpers;
using DatingApp.Interfaces;
using DatingApp.Services;

namespace DatingApp.Extensions
{
    public static class ApplicationServices
    {
        public static void InitializeLayers(this IServiceCollection serviceCollections, IConfiguration config)
        {
            serviceCollections.AddScoped<IUserBL,UserBL>();
            serviceCollections.AddScoped<IUserDAL,UserDAL>();
            serviceCollections.AddScoped<ITokenService,TokenService>();
            serviceCollections.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            serviceCollections.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            serviceCollections.AddScoped<IPhotoService,PhotoService>();
            serviceCollections.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
            });

            serviceCollections.AddScoped<LogUserActivity>();
        }
    }
}