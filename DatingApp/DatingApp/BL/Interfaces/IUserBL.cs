using DatingApp.DAL.Entity;
using DatingApp.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.BL.Interfaces
{
    public interface IUserBL
    {
        Task<RegisterResponseDto> Register(RegisterDto registerDto);
        Task<RegisterResponseDto> Login(LoginDto loginDto);
        Task<IEnumerable<MemberDto>> getAllMembers();
        Task<ActionResult<MemberDto>> getUserById(long id);

        Task<MemberDto> getMemberByUserName(string userName);
        Task getMember(string username,MemberUpdateRequestDto memberRequest);
        Task<PhotoDto> addPhoto(IFormFile file,string userName);
        Task setMainPhoto(int photoId,string userName);
        Task deletePhoto(string username,int photoId);
    }
}
