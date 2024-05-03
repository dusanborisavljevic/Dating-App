using DatingApp.Helpers;
using System.Text.Json;

namespace DatingApp.Extensions
{
    public static class HttpExtensions
    {
        public static void ExtendHeader(this HttpResponse response,PaginationHeader header)
        {
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(header,options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");

        }
    }
}
