using AutoMapper;
using DatingApp.BL.Interfaces;
using DatingApp.DAL.Entity;
using DatingApp.DAL.Interfaces;
using DatingApp.DTOs;
using DatingApp.Helpers;
using DatingApp.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace DatingApp.BL.Implementations
{
    public class UserBL : IUserBL
    {
        private readonly IUserDAL _userDAL;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public UserBL(IUserDAL userDAL,ITokenService tokenService,IMapper mapper,IPhotoService photoService)
        {
            _userDAL = userDAL;
            _tokenService = tokenService;
            _mapper = mapper;
            _photoService = photoService;
        }

        public async Task<PhotoDto> addPhoto(IFormFile file,string userName)
        {
            var user = await _userDAL.getUserByUserName(userName);
            if(user == null)
            {
                throw new Exception("Bad request");
            }

            var result = await _photoService.addPhotoAsync(file);
            if(result.Error != null)
            {
                throw new Exception(result.Error.Message);
            }

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
            };
            if(user.Photos.Count == 0)
                photo.IsMain = true;

            user.Photos.Add(photo);

            if(await _userDAL.SaveAllAsync())
            {
                return _mapper.Map<PhotoDto>(photo);
            }

            throw new Exception("Bad request");
        }

        public async Task deletePhoto(string username, int photoId)
        {
            var user = await _userDAL.getUserByUserName(username);
            if(user == null )
            {
                throw new Exception("Error:There is no user!");
            }

            var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);
            if(photo == null)
            {
                throw new Exception("Error:There is no photo with thad id");
            }

            if(photo.IsMain)
            {
                throw new Exception("Error:Main photo can not be deleted!");
            }

            if (photo.PublicId != null)
            {
                var result = await _photoService.deletePhotoAsync(photo.PublicId);
                if(result.Error!=null)
                {
                    throw new Exception(result.Error.Message);
                }
            }

            user.Photos.Remove(photo);
            if (await _userDAL.SaveAllAsync()) return;

            throw new Exception("Something went wrong with deleting");
        }

        public async Task<PagedList<MemberDto>> getAllMembers(UserParams userParams)
        {
            var currentUser = await _userDAL.getUserByUserName(userParams.CurrentUserName);
            if(userParams.Gender.IsNullOrEmpty())
            {
                userParams.Gender = currentUser.Gender == "female" ? "male" : "female";
            }
            var users = await _userDAL.GetAllMembersAsync(userParams);
            if (users.Count() == 0)
                throw new Exception("No users");

            return users;
        }

        public async Task getMember(string username,MemberUpdateRequestDto memberRequest)
        {
            var user = await _userDAL.getUserByUserName(username);
            if (user == null)
                throw new Exception("There is no user with that username");

            _mapper.Map(memberRequest, user);
            if(!await _userDAL.SaveAllAsync())
            {
                throw new Exception("Bad request");
            }

            return;
        }

        public async Task<MemberDto> getMemberByUserName(string userName)
        {
            return await _userDAL.GetMemberById(userName);
        }

        public async Task<ActionResult<MemberDto>> getUserById(long id)
        {
            var user = await _userDAL.GetUserById(id);
            if (user == null) throw new Exception("There is no user with thad id:" + id);

            return _mapper.Map<MemberDto>(user);
        }

        public async Task<RegisterResponseDto> Login(LoginDto loginDto)
        {
            var user = await _userDAL.getUserByUserName(loginDto.UserName);
            if (user == null)
            {
                throw new Exception("Bad credentials");
            }

            bool isValidPassword = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password1);
            if(!isValidPassword)
            {
                throw new Exception("Bad credentials");
            }

            return new RegisterResponseDto()
            {
                UserName = user.UserName,
                Token = _tokenService.createToken(loginDto.UserName,(int)user.Id),
                url = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };


        }

        public async Task<RegisterResponseDto> Register(RegisterDto registerDto)
        {
            if (await _userDAL.getUserByUserName(registerDto.UserName) !=  null)
            {
                throw new Exception("Bad credentials");
            }
            var user = _mapper.Map<User>(registerDto);
            user.UserName = registerDto.UserName.ToLower();
            user.Password1 = BCrypt.Net.BCrypt.HashPassword(registerDto.Password1);
            

            await _userDAL.Add(user);
            await _userDAL.SaveAllAsync();

            return new RegisterResponseDto()
            {
                UserName = user.UserName,
                Token = _tokenService.createToken(registerDto.UserName, (int)user.Id),
                url = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        public async Task setMainPhoto(int photoId,string userName)
        {
            var user = await _userDAL.getUserByUserName(userName);
            if (user == null)
            {
                throw new Exception("Not found");
            }

            var photo = user.Photos.FirstOrDefault(x=>x.Id == photoId);
            if(photo == null)
            {
                throw new Exception("Not found photo");
            }

            if(photo.IsMain)
            {
                throw new Exception("Photo is already main");
            }

            var currentMainPhoto = user.Photos.FirstOrDefault(x => x.IsMain);
            if(currentMainPhoto != null) currentMainPhoto.IsMain = false;
            photo.IsMain = true;

            if(await _userDAL.SaveAllAsync())
            {
                return;
            }

            throw new Exception("Something went wrong while saving");
            


        }
    }
}