using DatingApp.DAL.Entity;
using DatingApp.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.DAL.Interfaces
{
    public interface IUserDAL
    {
        Task<User> getUserByUserName(string userName);
        Task<bool> SaveAllAsync();
        Task Add(User user);
        Task<IEnumerable<MemberDto>> GetAllMembersAsync();

        Task<User> GetUserById(long id);
        Task<MemberDto> GetMemberById(string username);
    }
}