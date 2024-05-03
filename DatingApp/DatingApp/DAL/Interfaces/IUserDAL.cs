using DatingApp.DAL.Entity;
using DatingApp.DTOs;
using DatingApp.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.DAL.Interfaces
{
    public interface IUserDAL
    {
        Task<User> getUserByUserName(string userName);
        Task<bool> SaveAllAsync();
        Task Add(User user);
        Task<PagedList<MemberDto>> GetAllMembersAsync(UserParams userParams);

        Task<User> GetUserById(long id);
        Task<MemberDto> GetMemberById(string username);
    }
}