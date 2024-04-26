using System.Text.Json;

namespace DatingApp.Exceptions
{
    public class CustomException
    {
        public int statusCode { get; set; }
        public string message { get; set; }
        public string details { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}