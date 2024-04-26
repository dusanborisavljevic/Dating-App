namespace DatingApp.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PassswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Creted { get; set; } = DateTime.UtcNow;
        public DateTime LastActive {  get; set; } = DateTime.UtcNow;
        public string Gender { get; set; }
        public string Indroduction { get; set; }
        public string LookingFor { get; set; }
        public string Interesets { get; set; }
        public string City {  get; set; }
        public string Country { get; set; }
        public List<Photo> photos { get; set; } = new();
    }
}
