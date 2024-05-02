using AutoMapper;
using DatingApp.DAL.Entity;
using DatingApp.DTOs;
namespace DatingApp.Mapper
{
    public class MyMapper : Profile
    {
        public MyMapper()
        {
            CreateMap<User, MemberDto>().ForMember(dest => dest.PhotoUrl,
                opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Photo,PhotoDto>();

            CreateMap<MemberUpdateRequestDto, User>();
            CreateMap<RegisterDto, User>();
        }
    }
}