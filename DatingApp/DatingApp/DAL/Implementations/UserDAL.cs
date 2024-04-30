using AutoMapper;
using AutoMapper.QueryableExtensions;
using DatingApp.DAL.Context;
using DatingApp.DAL.Entity;
using DatingApp.DAL.Interfaces;
using DatingApp.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.DAL.Implementations
{
    public class UserDAL : IUserDAL
    {
        private readonly dboContext _context;
        private readonly IMapper _mapper;
        public UserDAL(dboContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Add(User user)
        {
            await _context.AddAsync(user);
        }

        public async Task<IEnumerable<MemberDto>> GetAllMembersAsync()
        {
            return await _context.Users.
                                 ProjectTo<MemberDto>(_mapper.ConfigurationProvider).
                                 ToListAsync();
        }

        public async Task<MemberDto> GetMemberById(string username)
        {
            return await _context.Users.
                            Where(x => x.UserName == username).
                            ProjectTo<MemberDto>(_mapper.ConfigurationProvider).
                            SingleOrDefaultAsync();
        }

        public async Task<User> GetUserById(long id)
        {
            return await _context.Users.
                                  Where(x => x.Id == id).
                                  Include(p => p.Photos).
                                  FirstOrDefaultAsync();
        }

        public async Task<User> getUserByUserName(string userName)
        {
            return await _context.Users.
                          Where(x => x.UserName == userName.ToLower()).
                          Include(p => p.Photos).
                          SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}