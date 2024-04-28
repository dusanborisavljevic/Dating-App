using DatingApp.DAL.Entity;

namespace DatingApp.DTOs
{
    public class MemberDto
    {
        public long Id { get; set; }

        public string UserName { get; set; }
        public string PhotoUrl {  get; set; }

        public string KnownAs { get; set; }

        public DateTime? Creted { get; set; }

        public DateTime? LastActive { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string Gender { get; set; }

        public string Indroduction { get; set; }

        public string LookingFor { get; set; }

        public string Interesets { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public virtual ICollection<PhotoDto> Photos { get; set; }
    }
}