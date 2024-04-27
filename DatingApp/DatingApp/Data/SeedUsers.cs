using DatingApp.DAL.Context;
using DatingApp.DAL.Entity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace DatingApp.Data
{
    public class SeedUsers
    {
        public static async Task Seed(dboContext context)
        {
            if (await context.Users.AnyAsync()) return;
            var jsonUsers = File.ReadAllText("Data\\87 - UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<User>>(jsonUsers);
            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                user.Password1 = BCrypt.Net.BCrypt.HashPassword("string");
                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}
        
